import fs from 'node:fs';
import path from 'node:path';

import 'dotenv/config';
import { JWT } from 'google-auth-library';

import { GoogleSpreadsheet } from 'google-spreadsheet';

/** ========= ENV ========= */
const {
  GOOGLE_SHEETS_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  I18N_OUT_DIR = 'src/shared/i18n/messages',
  I18N_LOCALES = 'en,ko',
  I18N_KEY_COL = 'key',
} = process.env;
console.log('🔧 환경 변수:', process.env.GOOGLE_SHEETS_ID);
if (!GOOGLE_SHEETS_ID) {
  console.error('❌ GOOGLE_SHEETS_ID 가 필요합니다');
  process.exit(1);
}
if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error(
    '❌ GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY 가 필요합니다',
  );
  process.exit(1);
}

const LOCALES = I18N_LOCALES.split(',')
  .map((s) => s.trim())
  .filter(Boolean);

/** ========= UTILS ========= */
const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });

/** a.b.c → obj[a][b][c] = value */
const setByPath = (obj, dottedKey, value) => {
  const parts = String(dottedKey).split('.');
  let cur = obj;
  while (parts.length > 1) {
    const part = parts.shift();
    if (!cur[part] || typeof cur[part] !== 'object') cur[part] = {};
    cur = cur[part];
  }
  cur[parts[0]] = value;
};

/** {name}, {count, plural, ...} 간단 추출 */
const extractICUPlaceholders = (msg) => {
  const re = /\{([a-zA-Z_][a-zA-Z0-9_]*)(,[^}]*)?\}/g;
  const set = new Set();
  if (typeof msg !== 'string') return set;
  let m;
  while ((m = re.exec(msg))) set.add(m[1]);
  return set;
};

/** ========= MAIN ========= */
async function run() {
  // private key 줄바꿈 처리 (CI에서 \n로 들어올 때)
  const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  // 🔐 JWT(OAuth2)로 인증
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const doc = new GoogleSpreadsheet(GOOGLE_SHEETS_ID, auth);
  await doc.loadInfo();

  console.log(`📄 시트 제목: ${doc.title} (워크시트 수: ${doc.sheetCount})`);

  // 로케일별 전체 결과 구조 (탭 이름이 최상위 네임스페이스)
  // perLocale = { en: { [namespace]: {...} }, ko: {...} }
  const perLocale = Object.fromEntries(LOCALES.map((l) => [l, {}]));
  const warnings = [];

  for (let i = 0; i < doc.sheetCount; i++) {
    const sheet = doc.sheetsByIndex[i];
    const namespace = sheet.title; // 탭명 = namespace
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;

    // 필수 컬럼 확인
    const missing = [I18N_KEY_COL, ...LOCALES].filter(
      (col) => !headers.includes(col),
    );
    if (missing.length) {
      console.log(
        `⚠️ [${namespace}] 필요한 컬럼 없음: ${missing.join(
          ', ',
        )} → 이 시트는 건너뜁니다`,
      );
      continue;
    }

    console.log(`🔎 처리중: ${namespace}`);
    const rows = await sheet.getRows(); // 모든 행

    for (const row of rows) {
      const key = String(row[I18N_KEY_COL] || '').trim();
      if (!key) continue;

      // 기준 로케일(첫 번째) ICU 자리표시자 추출
      const baseLocale = LOCALES[0];
      const baseMsg = (row[baseLocale] ?? '').toString();
      const baseICU = extractICUPlaceholders(baseMsg);

      for (const locale of LOCALES) {
        const msg = (row[locale] ?? '').toString();
        const curICU = extractICUPlaceholders(msg);

        // 자리표시자 개수 불일치 경고
        if (locale !== baseLocale && baseICU.size !== curICU.size) {
          warnings.push(
            `🧩 ICU placeholder 불일치: [${namespace}] ${key} :: ${baseLocale}=${[
              ...baseICU,
            ].join(', ')} | ${locale}=${[...curICU].join(', ')}`,
          );
        }

        // perLocale[locale][namespace][a.b.c] = value (중첩 반영)
        if (!perLocale[locale][namespace]) perLocale[locale][namespace] = {};
        setByPath(perLocale[locale][namespace], key, msg);
      }
    }
  }

  // 출력
  ensureDir(I18N_OUT_DIR);
  for (const locale of LOCALES) {
    const outPath = path.join(I18N_OUT_DIR, `${locale}.json`);
    fs.writeFileSync(
      outPath,
      JSON.stringify(perLocale[locale], null, 2) + '\n',
      'utf8',
    );
    console.log(`✅ 생성: ${outPath}`);
  }

  if (warnings.length) {
    console.log('\n==== 경고 ====');
    for (const w of warnings) console.log(w);
    console.log('==============\n');
  }

  console.log('🎉 완료');
}

run().catch((e) => {
  console.error('❌ 실패:', e);
  process.exit(1);
});
