import {SharedStateKey} from './constants';
import {useSharedState} from './state/useSharedState';

export enum Feature {
  guestMode = 'Guest mode',
  offlineMode = 'Offline mode',
  accounts = 'Accounts',
  profileTab = 'Profile tab',
  historyTab = 'History tab',
  lobbyTab = 'Lobby tab',
  spectatorTab = 'Spectator tab',
}

enum Rollout {
  disabled,
  inDevelopment,
  released,
}

const featureRollout = (feature: Feature): Rollout => {
  switch (feature) {
    case Feature.guestMode:
    case Feature.spectatorTab:
      return Rollout.released;
    case Feature.offlineMode:
      return Rollout.inDevelopment;
    case Feature.accounts:
    case Feature.profileTab:
    case Feature.historyTab:
    case Feature.lobbyTab:
      return Rollout.disabled;
  }
};

const featureDependencies = (feature: Feature): Set<Feature> => {
  switch (feature) {
    case Feature.accounts:
    case Feature.guestMode:
    case Feature.offlineMode:
    case Feature.lobbyTab:
    case Feature.spectatorTab:
      return new Set();
    case Feature.profileTab:
    case Feature.historyTab:
      return new Set([Feature.accounts]);
  }
};

const isFeatureEnabled = (feature: Feature) => {
  const rollout = featureRollout(feature);
  const dependenciesEnabled = Array.from(featureDependencies(feature))
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
