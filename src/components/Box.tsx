import React from 'react';
import {Animated} from 'react-native';
import {createBox} from '@shopify/restyle';

import {Theme} from 'utilities/theme';

export const Box = createBox<Theme>();

export const AnimatedBox = Animated.createAnimatedComponent(
  class BoxClass extends React.PureComponent<React.ComponentProps<typeof Box>> {
    render() {
      return <Box {...this.props} />;
    }
  },
);
