import { Howl } from "howler";

import type { SoundsData, SoundKey } from "../types";

import soundClick from "@/assets/sounds/click.mp3";

export const sounds = {
  bird: { spriteKey: "room", name: "bird" },
  click: {
    howl: new Howl({
      src: [soundClick],
      loop: false,
      volume: 1,
      preload: false,
    }),
  },
  gasp: { spriteKey: "contact", name: "gasp" },
  keyboard: { spriteKey: "room", name: "keyboard" },
  mouseWheel0: { spriteKey: "room", name: "mouse-wheel-0" },
  mouseWheel1: { spriteKey: "room", name: "mouse-wheel-1" },
  mouseWheel2: { spriteKey: "room", name: "mouse-wheel-2" },
  notification: { spriteKey: "room", name: "notification" },
  snore: { spriteKey: "contact", name: "snore" },
} as const satisfies SoundsData;

export const pools = {
  mouseWheel: ["mouseWheel0", "mouseWheel1", "mouseWheel2"],
} as const satisfies Record<string, SoundKey[]>;
