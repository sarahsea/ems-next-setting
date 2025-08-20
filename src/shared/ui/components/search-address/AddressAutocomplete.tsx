'use client';
import { useMemo, useState } from 'react';

import { MapboxSearchBox } from '@mapbox/search-js';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';

// npm i @mapbox/search-js

export default function AddressAutocomplete() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const client = useMemo(
    () =>
      new MapboxSearchBox({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
      }),
    [],
  );

  // 간단 디바운스
  async function onChange(v: string) {
    setQ(v);
    if (!v) return setItems([]);
    const res = await client.suggest(v, {
      limit: 5,
      language: ['en', 'ko'],
      country: ['AU', 'KR', 'US', 'GB'],
    });
    setItems(res?.suggestions ?? []);
  }

  async function onPick(s: any) {
    // 세부정보 조회(정규화 필드 얻기)
    const det = await client.retrieve(s.mapbox_id);
    // det.features[0].properties 에 도로/도시/우편/국가 코드 등이 들어있음
    console.log('address detail:', det);
  }

  return (
    <div>
      <TextField
        label="Address"
        value={q}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        autoComplete="off"
      />
      <List>
        {items.map((s) => (
          <ListItemButton key={s.mapbox_id} onClick={() => onPick(s)}>
            {s.name}
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}
