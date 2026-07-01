# Hero backdrop image

Drop a generated image here named **`hero-backdrop.webp`** to replace the CSS
cinematic fallback in the landing hero.

- The hero (`HeroBackdrop.tsx`) references `/hero/hero-backdrop.webp`.
- If the file is missing, the `<img>` `onError` hides itself and the animated
  aurora / glow-orbs / grain layers carry the hero on their own — so the page
  looks complete with or without an image.
- Recommended export: **~2560×1440 WebP**, optimized (< ~400 KB).

## Suggested generation prompt (Nano Banana 2 / Gemini)

> Cinematic abstract dark technology backdrop. Deep charcoal-black background
> (#0a0a0a) with volumetric lime-green (#84cc16) light rays, soft glowing
> particles, and a subtle 3D geometric wireframe mesh receding into fog. Moody
> atmospheric depth-of-field, premium software-engineering aesthetic, high
> detail, 16:9, generous dark negative space on the LEFT third for headline text.
