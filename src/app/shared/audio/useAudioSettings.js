import { useSyncExternalStore } from "react";
import {
  isMuted,
  setAudioMuted,
  subscribeAudio,
  toggleAudioMuted,
} from "./audioManager";

export function useAudioSettings() {
  const muted = useSyncExternalStore(subscribeAudio, isMuted, () => false);

  return {
    audioMuted: muted,
    setAudioMuted,
    toggleAudioMuted,
  };
}
