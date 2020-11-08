import {SharedStateKey} from './constants';
import {useSharedState} from './state/useSharedState';

export enum Feature {
  guestMode = 'Guest mode',
  offlineMode = 'Offline mode',
  accounts = 'Accounts',
}

enum Rollout {
  disabled,
  inDevelopment,
  released,
}

const featureRollout = (feature: Feature) => {
  switch (feature) {
    case Feature.guestMode:
      return Rollout.released;
    case Feature.offlineMode:
      return Rollout.inDevelopment;
    case Feature.accounts:
      return Rollout.disabled;
  }
};

const featureDependencies = (feature: Feature): Feature[] => {
  return [];
};

const isFeatureEnabled = (feature: Feature) => {
  const rollout = featureRollout(feature);
  const dependenciesEnabled = featureDependencies(feature)
    .filter(f => f !== feature)
    .reduce<boolean>((prev, next) => prev && isFeatureEnabled(next), true);

  if (!dependenciesEnabled) {
    return false;
  }

  if (__DEV__) {
    return rollout >= Rollout.inDevelopment;
  } else {
    return rollout >= Rollout.released;
  }
};

export const useFeatureFlag = (feature: Feature) => {
  return useSharedState(SharedStateKey.featureFlags, isFeatureEnabled(feature));
};

export const hasFeature = (feature: Feature) => {
  return isFeatureEnabled(feature);
};

export const hasAnyFeature = (features: Feature[]) => {
  features.some(feature => hasFeature(feature));
};

export const hasAllFeatures = (features: Feature[]) => {
  features.every(feature => hasFeature(feature));
};
