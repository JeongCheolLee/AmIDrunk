declare module '*.png' {
  import {ImageSourcePropType, ImageURISource} from 'react-native';

  const src: ImageSourcePropType & ImageURISource;
  export default src;
}
