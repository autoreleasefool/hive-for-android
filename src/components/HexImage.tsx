import React, {ComponentProps} from 'react';
import FastImage from 'react-native-fast-image';

type Props = ComponentProps<typeof FastImage>;

export const HexImage = (props: Props) => {
  return <FastImage {...props} />;
};
