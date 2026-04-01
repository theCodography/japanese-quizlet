# Design System Strategy: The Zen Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Serene Scholar"**
This design system rejects the cluttered, "gamified" look of typical language apps in favor of a high-end editorial experience. We are building a digital "Ryokan"—a space that is premium, tranquil, and deeply intentional. 

The system moves beyond standard layouts by embracing **Asymmetric Balance**. We avoid rigid, centered grids; instead, we use "breathing room" (generous white space) and overlapping elements to create a sense of flow. By treating the UI as a series of layered, fine-paper surfaces rather than flat digital boxes, we mirror the tactile beauty of Japanese stationery and the modern professional energy of the Indigo palette.

---

## 2. Colors: Tonal Depth over Borders
The palette is a dialogue between the softness of the Cherry Blossom (`primary_container`) and the intellectual weight of Deep Indigo (`secondary`).

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background shifts. For instance, a lesson module (`surface_container_low`) should sit on a `surface` background. If the user needs to distinguish a card, we use a shift to `surface_container_lowest` (pure white) to create a "lift" without a single line.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers. 
    *   **Base:** `surface` (#f9f9fb)
    *   **Sectioning:** `surface_container_low`
    *   **Focus Cards:** `surface_container_lowest` (#ffffff)
    *   **Interactive Overlays:** `surface_bright`
*   **The "Glass & Gradient" Rule:** To provide "soul," primary CTAs and Hero sections should utilize subtle radial gradients. Transition from `primary` (#864e5a) to `primary_container` (#ffb7c5) at a 45-degree angle. For floating navigation or vocabulary pop-ups, apply **Glassmorphism**: use `surface` at 80% opacity with a `backdrop-blur` of 12px.
*   **Signature Textures:** Use the `secondary_container` (#959efd) for highlighting Japanese grammar points—it provides a cool, focused contrast to the warmer pink tones.

---

## 3. Typography: The Bilingual Rhythm
We employ a dual-typeface system to ensure both Vietnamese and Japanese characters feel authoritative yet approachable.

*   **Display & Headlines (Plus Jakarta Sans):** Used for "Brand Moments." This typeface's geometric clarity feels modern and high-end. Use `display-lg` for hero headers to create an editorial, magazine-like feel.
*   **Body & Titles (Be Vietnam Pro):** This font provides exceptional legibility for the specific diacritics of Vietnamese and the complex strokes of Kanji. 
*   **Visual Hierarchy:**
    *   **The Power Scale:** Large `display-md` headers should be paired with `body-sm` metadata to create high-contrast "moments" that guide the eye effortlessly.
    *   **Kanji Prominence:** When displaying Kanji, always use `title-lg` or higher to ensure stroke clarity, paired with `label-md` for Furigana (reading aids).

---

## 4. Elevation & Depth
We define hierarchy through **Tonal Layering**, not structural scaffolding.

*   **The Layering Principle:** Depth is "stacked." To highlight a vocabulary card, place a `surface_container_lowest` card atop a `surface_container_low` background. The slight shift in value creates a natural, soft lift.
*   **Ambient Shadows:** If a component must "float" (like a floating action button or a modal), use an ultra-diffused shadow:
    *   *Blur:* 32px to 64px.
    *   *Opacity:* 4%-6%.
    *   *Color:* Use a tinted `on_surface` (a deep indigo-grey) rather than true black to maintain the "Zen" atmosphere.
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use `outline_variant` (#d6c2c4) at 15% opacity. It should be felt, not seen.
*   **Roundedness:** Stick to the `lg` (2rem) scale for main cards and `full` (9999px) for buttons. This "pill" and "super-ellipse" aesthetic removes the "aggression" of sharp corners, reinforcing the friendly, encouraging brand.

---

## 5. Components

### Buttons
*   **Primary:** Gradient-filled (Primary to Primary Container), `full` roundedness. No shadow on rest; a soft `Ambient Shadow` on hover.
*   **Secondary:** `secondary` text on `secondary_fixed_dim` background. 
*   **Tertiary:** Transparent background, `primary` text. Use for "Skip" or "Back" actions.

### Vocabulary Cards
*   **Rule:** Forbid divider lines. Use `16` (4rem) spacing to separate Kanji, Romaji, and Meaning.
*   **Style:** `surface_container_lowest` background with an `xl` (3rem) corner radius. Use a `secondary_container` accent bar (4px width) on the left side to denote "New Word."

### Learning Progress Chips
*   **Style:** `surface_container_high` with `label-md` text. When active, transition to `primary_container` with `on_primary_container` text.

### Input Fields (Writing Practice)
*   **Style:** Large, expansive areas using `surface_container_lowest`. No bottom line; instead, use a subtle `outline_variant` at 20% opacity. Focus state shifts the background to `primary_fixed` (#ffd9df) to warmly encourage the user.

### Learning "Trays" (Bottom Sheets)
*   For mobile or quick-reference info, use a "frosted" tray. Use `surface` at 70% opacity with a heavy backdrop blur. This keeps the user grounded in their current lesson while providing the necessary info.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. Place a large Kanji character partially off-grid to create a sophisticated, editorial look.
*   **Do** prioritize vertical rhythm. Use the `12` (3rem) and `16` (4rem) spacing tokens to let content "breathe."
*   **Do** use the `secondary` (Deep Indigo) for all "Actionable" or "Critical" text to maintain a professional contrast.

### Don't:
*   **Don't** use 1px dividers or borders to separate lessons. Use a background color shift to `surface_container_low` instead.
*   **Don't** use pure black (#000000). Always use `on_surface` (#1a1c1d) for text to keep the interface soft.
*   **Don't** overcrowd the screen. If a screen feels full, it is wrong. Move secondary information into a "Glass" modal or a secondary layer.
*   **Don't** use standard "drop shadows." If it looks like a default CSS shadow, it's too heavy. It should look like light passing through paper.