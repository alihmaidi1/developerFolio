You are working as a Senior React Frontend Engineer on an existing landing page.

Your task is to refactor, stabilize, and polish the landing page while preserving the current visual concept and improving the internal architecture, maintainability, and reliability.

Do not redesign the page from scratch. Keep the intended identity:

* Large developer name.
* Creative developer badge.
* Simple floating header.
* 3D desk/room scene.
* Avatar inside the same 3D visual area.
* Smooth animation.
* Backend-driven content from `/api/landing-page`.

---

# Main Goal

Refactor the landing page into a clean, maintainable, production-ready React structure with proper separation of concerns.

The page must preserve the current design direction, but the code should be improved to follow Senior React standards:

* Single Responsibility Principle for components.
* Clear separation between UI, logic, data fetching, styles, animation, and 3D scene setup.
* Reusable components where appropriate.
* No duplicated layout logic.
* No mixed business/data logic inside presentational components.
* No scattered hardcoded values that make responsiveness difficult.
* No unnecessary large refactors outside the landing page scope.

---

# Success Criteria

The final implementation must satisfy all of the following:

* The hero keeps the same visual composition and identity.
* The 3D room/desk and avatar render together reliably.
* Landing content is loaded from one endpoint only: `/api/landing-page`.
* Loading behavior is unified with the global loading system.
* Components are clearly separated by responsibility.
* Data fetching logic is isolated from presentational UI.
* Animation logic is centralized and does not conflict with scroll behavior.
* 3D scene logic is isolated from normal page layout logic.
* CSS is organized, scoped, and not mixed randomly across components.
* Desktop, tablet, and mobile layouts have no overflow or broken alignment.
* The frontend build passes with:

```bash
npm run build:docker
```

---

# Required Architecture Standard

Refactor the landing page using a clean structure similar to this:

```txt
landing/
  LandingPage.tsx
  landing.types.ts
  landing.api.ts
  landing.mapper.ts

  hooks/
    useLandingPageData.ts
    useLandingPageLoading.ts
    useLandingAnimations.ts

  components/
    LandingHeader/
      LandingHeader.tsx
      LandingHeader.module.css

    HeroSection/
      HeroSection.tsx
      HeroIntro.tsx
      HeroActions.tsx
      CreativeBadge.tsx
      HeroSection.module.css

    LandingScene/
      LandingScene.tsx
      LandingCanvas.tsx
      RoomModel.tsx
      AvatarModel.tsx
      SceneFallback.tsx
      useSceneAssets.ts
      useResponsiveScenePreset.ts
      LandingScene.module.css

    AboutSection/
      AboutSection.tsx
      AboutSection.module.css

    ProjectsSection/
      ProjectsSection.tsx
      ProjectCard.tsx
      ProjectsSection.module.css

    CareerJourneySection/
      CareerJourneySection.tsx
      CareerStep.tsx
      CareerJourneySection.module.css

    ContactSection/
      ContactSection.tsx
      ContactSection.module.css

    LandingFooter/
      LandingFooter.tsx
      LandingFooter.module.css
```

Adjust the exact file names to match the current project conventions, but keep the same architectural idea.

---

# Component Responsibility Rules

Apply the Single Responsibility Principle.

## LandingPage

`LandingPage` should only coordinate the page.

It may:

* Call the landing data hook.
* Pass data to sections.
* Coordinate global loading state.
* Render the main page structure.

It should not contain:

* Raw API request logic.
* Complex animation logic.
* 3D scene setup.
* Large JSX blocks for every section.
* Hardcoded section content.

---

## API Layer

Move landing API logic into a dedicated file, for example:

```txt
landing.api.ts
```

It should handle:

* Calling `/api/landing-page`.
* Returning typed data.
* Basic error handling.

Do not call `/api/landing-page` from multiple components.

Do not create extra requests for landing content unless there is a real backend requirement.

---

## Data Hook

Create or clean a hook such as:

```txt
useLandingPageData.ts
```

It should handle:

* Fetching landing data.
* Loading state.
* Error state.
* Retry-ready structure if needed.
* Returning a clean view model to the UI.

The UI components should receive data through props.

Avoid making presentational components fetch their own data.

---

## Mapper Layer

If the API response shape is not ideal for the UI, create a mapper:

```txt
landing.mapper.ts
```

The mapper should convert backend response data into frontend-friendly structures.

Avoid spreading backend response assumptions across all components.

---

# Styling Rules

Separate structure from styling.

Use the existing project styling approach. If the project already uses CSS Modules, keep CSS Modules. If it uses SCSS or plain CSS, keep the convention.

Preferred structure:

```txt
ComponentName.tsx
ComponentName.module.css
```

CSS responsibilities should be grouped clearly:

```css
/* Layout */
/* Hero */
/* 3D Scene */
/* Animation */
/* Responsive */
```

Do not:

* Put large inline styles inside JSX unless values are dynamic and justified.
* Mix unrelated section styles in one huge file.
* Use random magic numbers without clear layout purpose.
* Keep old experimental CSS values that fight the current layout.
* Allow horizontal overflow on mobile.

Use consistent breakpoints for:

* Desktop: 1440px and 1366px.
* Tablet: 1024px and 768px.
* Mobile: 390px.

---

# JSX / Markup Rules

Keep JSX readable and focused.

Avoid very large JSX blocks inside one component.

Break down hero UI into smaller components:

* `HeroIntro`
* `CreativeBadge`
* `HeroActions`
* `LandingScene`

The hero section should describe the layout, not contain all logic.

Example responsibility:

```txt
HeroSection
  - owns hero layout
  - receives hero data as props
  - renders HeroIntro and LandingScene
```

```txt
HeroIntro
  - renders name, title, badge, short text, buttons
  - no API logic
  - no 3D logic
```

```txt
LandingScene
  - owns 3D visual rendering
  - no page content logic
```

---

# 3D Scene Rules

The 3D scene must be isolated from the normal landing layout.

Create a dedicated `LandingScene` area responsible for:

* Canvas setup.
* Room model loading.
* Avatar model loading.
* Scene lighting.
* Camera configuration.
* Desktop/tablet/mobile scene presets.
* Scene fallback.
* Asset loading state.

The scene should verify these assets:

* `room.glb`
* `avatar.glb`
* Room textures.
* Avatar textures.
* Shadows.
* Sprites/audio only if they are actually still used.

Fix the current issue where only the avatar appears and the room/desk does not appear.

The final scene must guarantee:

* Room and avatar are both added to the scene.
* Asset paths are correct.
* Loading errors are handled.
* The canvas does not remain blank.
* Camera framing works on desktop.
* Responsive presets exist for tablet and mobile.
* A graceful fallback appears if WebGL or assets fail.

Keep 3D-specific logic out of normal page components.

---

# Responsive 3D Presets

Create a clean responsive scene preset system.

Example:

```ts
type ScenePreset = {
  cameraPosition: [number, number, number];
  modelScale: number;
  modelPosition: [number, number, number];
  avatarPosition: [number, number, number];
};
```

Use separate presets for:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

Avoid trying to fix all screen sizes with one camera value.

---

# Loading Flow

Unify landing loading with the shared/global loading system.

The page should remain in loading state until:

* `/api/landing-page` has resolved.
* Critical 3D assets are loaded.
* The first hero animation can start safely.

Avoid:

* Separate landing-only loaders that conflict with the global loader.
* Flicker between API loading and scene loading.
* Showing the hero before the 3D canvas is ready.
* Showing an empty canvas without fallback.

Use a clear combined loading state, for example:

```ts
const isLandingReady = dataReady && sceneReady && animationReady;
```

Do not scatter loading decisions across many components.

---

# Animation Rules

Create one controlled animation flow.

Recommended sequence:

1. Header entrance.
2. Name/title entrance.
3. Creative developer badge entrance.
4. 3D scene reveal.
5. Scroll transition into the next sections.

Animation logic should be placed in a dedicated hook or animation utility, for example:

```txt
useLandingAnimations.ts
```

Avoid:

* Multiple conflicting animation triggers.
* Scroll animations that fight browser scroll.
* Animation logic directly mixed into every component.
* Layout shifts caused by animation.
* Noisy motion.

Support:

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable or simplify animations */
}
```

Animations should feel smooth and controlled, not excessive.

---

# Hero Layout Requirements

The hero is the first viewport visual anchor.

Preserve this composition:

* Header floating above the hero.
* Name and title on the left.
* Creative developer badge near the title.
* 3D desk/room/avatar scene as the dominant visual.
* Clean spacing between text, badge, buttons, and canvas.

Fix:

* Layout shift during loading.
* Hero height instability.
* Canvas overlapping text.
* Broken spacing.
* Text misalignment.
* Bad mobile stacking.
* Overflow caused by the canvas or absolute positioning.

Use:

* Stable `min-height`.
* Controlled `overflow`.
* Responsive grid/flex layout.
* Safe canvas bounds.
* Clear z-index rules.

---

# Section Responsibility

Each landing section should be independent and receive only the data it needs.

Sections:

* Header.
* Hero.
* 3D scene.
* About.
* Projects.
* Career Journey.
* Contact.
* Footer.

Do not let one section depend on the internal DOM structure of another section.

Avoid using global CSS selectors that accidentally affect multiple sections.

---

# Backend-Driven Content

Confirm that all landing page content comes from:

```txt
/api/landing-page
```

Do not hardcode content that already exists in the API response.

Acceptable hardcoded values:

* Layout labels that are purely UI-related.
* Fallback text for error states.
* Accessibility labels.
* Empty-state messages.

Not acceptable:

* Hardcoded projects.
* Hardcoded about content.
* Hardcoded career journey data.
* Hardcoded contact content that should come from the backend.

---

# Error Handling

Add clean error handling for:

* API request failure.
* Empty API response.
* Missing hero data.
* Missing project data.
* 3D asset load failure.
* WebGL unsupported environment.

The page should not crash.

Use graceful fallback UI where needed.

---

# Accessibility Requirements

Improve accessibility without changing the visual design.

Check:

* Header navigation is keyboard usable.
* Buttons and links have clear labels.
* Canvas has an accessible fallback label.
* Decorative 3D content does not confuse screen readers.
* Text contrast remains readable.
* Mobile tap targets are usable.

---

# Performance Requirements

Avoid unnecessary re-renders.

Use memoization only where it has real value.

Check:

* 3D models are not reloaded unnecessarily.
* Expensive animation setup does not run repeatedly.
* Data fetching happens once.
* Large components are not re-rendering without reason.
* Assets are loaded predictably.

Do not add unnecessary dependencies.

---

# CSS Cleanup Requirements

Remove:

* Unused landing styles.
* Duplicated breakpoints.
* Conflicting absolute positioning.
* Old experimental values.
* Dead animation classes.
* CSS that belongs to removed components.
* Global styles that should be scoped.

Keep style changes limited to landing-related files unless a shared component truly requires modification.

---

# Verification Checklist

After implementation, verify the page at:

* 1440px desktop.
* 1366px laptop.
* 1024px tablet.
* 768px small tablet.
* 390px mobile.

Check:

* No blank canvas.
* Room/desk appears.
* Avatar appears with the room.
* Camera framing is correct.
* Header is aligned.
* Hero text does not overlap canvas.
* Badge is positioned correctly.
* No horizontal scroll.
* Buttons are tappable on mobile.
* Loading does not flicker.
* Animations start smoothly.
* Scroll behavior is normal.
* Sections render from backend data.
* Build passes.

Run:

```bash
npm run build:docker
```

---

# Implementation Order

Follow this order:

1. Audit existing landing files and current responsibilities.
2. Identify mixed logic, duplicated styles, and conflicting animation code.
3. Create or clean the landing folder structure.
4. Separate API logic into a landing API layer.
5. Separate data loading into a custom hook.
6. Add types and mapper if needed.
7. Refactor hero into smaller single-responsibility components.
8. Isolate the 3D scene into dedicated scene components/hooks.
9. Fix room/avatar asset loading and camera framing.
10. Unify API loading and 3D loading with the global loading system.
11. Rebuild the animation flow using one controlled timeline.
12. Clean and scope CSS.
13. Polish responsive behavior.
14. Run the build.
15. Verify visually at all required viewport sizes.

---

# Constraints

* Do not replace the design concept.
* Do not rewrite unrelated pages.
* Do not change backend contracts unless there is an actual bug.
* Do not add unnecessary dependencies.
* Do not hardcode backend content.
* Do not leave large mixed-responsibility components.
* Do not leave duplicated CSS or conflicting animation logic.
* Prioritize stability, clean architecture, reliable 3D rendering, and responsive layout.

---

# Final Response Required From The Coding Agent

After finishing, return a concise technical summary containing:

* Files changed.
* Components created or refactored.
* Logic separated into hooks/API/mappers.
* CSS cleanup performed.
* 3D scene issue fixed.
* Loading behavior changes.
* Animation changes.
* Responsive fixes.
* Build result for `npm run build:docker`.
* Remaining risks or follow-up items.
