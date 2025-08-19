declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const SVG: FC<SVGProps<SVGElement>>;
  export default SVG;
}
declare module '*.svg?url' {
  const url: string;
  export default url;
}
