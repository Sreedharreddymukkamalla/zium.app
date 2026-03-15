import { create } from "zustand";
import { F1TVTier } from "../utils/extensionApi";
import { useFeatureFlags } from "./useFeatureFlags/useFeatureFlags";

type LoggedInState =
  | {
      type: "loggedOut";
    }
  | {
      type: "loggedIn";
      tier: F1TVTier;
    };

interface LoggedInStore {
  state: LoggedInState;
  setState: (state: LoggedInState) => void;
}
const useLoggedInStore = create<LoggedInStore>((set) => ({
  state: { type: "loggedIn", tier: "Pro" },
  setState: (state) => {
    set({ state });
  },
}));

export const useLoggedInStateExecutor = () => {
  // Login state is hardcoded; no extension required.
};

export const useLoggedInState = () => {
  return useLoggedInStore((state) => state.state);
};

export const useCurrentTier = (): F1TVTier => {
  const forceTVAccess = useFeatureFlags((state) => state.flags.forceTVAccess);
  return useLoggedInStore((state): F1TVTier => {
    if (state.state.type !== "loggedIn") {
      return "None";
    }

    if (forceTVAccess) {
      return "Access";
    }

    return state.state.tier;
  });
};
