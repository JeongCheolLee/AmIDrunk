import {colors, typos} from '@src/constants';
import {} from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    typos: typeof typos;
  }
}
