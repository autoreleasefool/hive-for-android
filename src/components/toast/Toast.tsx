import React, {useCallback, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AnimatedBox, Box} from 'components/Box';
import {Text} from 'components/Text';
import {Theme} from 'utilities/theme';
import {useToast} from './ToastProvider';

interface ToastStyle {
  foregroundColor: keyof Theme['colors'];
  backgroundColor: keyof Theme['colors'];
}

export enum ToastType {
  info,
  warning,
  error,
  success,
}

export enum ToastDuration {
  short = 'short',
  medium = 'medium',
  long = 'long',
}

export type ToastConfig = {
  message: string;
  duration?: ToastDuration | number;
} & ({type: ToastType} | ToastStyle);

const fadeDuration = 200;

const getToastDuration = ({duration}: ToastConfig) => {
  const resolvedDuration = duration ?? ToastDuration.medium;
  if (typeof resolvedDuration === 'number') {
    return resolvedDuration;
  } else {
    switch (resolvedDuration) {
      case ToastDuration.short:
        return 2000;
      case ToastDuration.medium:
        return 3500;
      case ToastDuration.long:
        return 5000;
    }
  }
};

const getToastStyle = (config: ToastConfig): ToastStyle => {
  if ('type' in config) {
    switch (config.type) {
      case ToastType.success:
        return {
          foregroundColor: 'textContrasting',
          backgroundColor: 'highlightSuccess',
        };
      case ToastType.error:
        return {
          foregroundColor: 'textContrasting',
          backgroundColor: 'highlightDanger',
        };
      case ToastType.info:
        return {
          foregroundColor: 'textContrasting',
          backgroundColor: 'backgroundLight',
        };
      case ToastType.warning:
        return {
          foregroundColor: 'textPrimary',
          backgroundColor: 'highlightWarning',
        };
    }
  } else {
    return {
      foregroundColor: config.foregroundColor,
      backgroundColor: config.backgroundColor,
    };
  }
};

export const Toast = () => {
  const insets = useSafeAreaInsets();
  const {toast, hideToast} = useToast();
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start(hideToast);
  }, [opacity, hideToast]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    fadeIn();

    const duration = getToastDuration(toast);
    const timer = setTimeout(fadeOut, duration);
    return () => clearTimeout(timer);
  }, [toast, fadeIn, fadeOut]);

  if (!toast) {
    return null;
  }

  const style = getToastStyle(toast);
  const {message} = toast;

  return (
    <AnimatedBox
      alignSelf="center"
      position="absolute"
      marginHorizontal="m"
      marginBottom="m"
      bottom={insets.bottom}
      maxWidth={480}
      style={{opacity}}>
      <Box borderRadius="m" padding="m" backgroundColor={style.backgroundColor}>
        <Text variant="body" textAlign="center" color={style.foregroundColor}>
          {message}
        </Text>
      </Box>
    </AnimatedBox>
  );
};
