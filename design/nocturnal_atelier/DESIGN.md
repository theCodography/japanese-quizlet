# DESIGN.md: The Nocturnal Atelier Design System

## 1. Overview & Creative North Star: "The Softer Night"
This design system rejects the harsh, high-contrast digital glare of traditional dark modes. Instead, it adopts the persona of **The Nocturnal Atelier**—a premium, scholarly environment that feels like a private library at midnight. 

### The Creative North Star: "Atmospheric Precision"
We move beyond "standard" UI by prioritizing serenity and focus. The layout breaks the rigid, modular "template" look through:
*   **Intentional Asymmetry:** Avoid perfectly centered blocks. Use staggered layouts to mimic the organic feel of an open workspace.
*   **Soft Minimalism:** Every element must earn its place. We value negative space as a functional tool to prevent cognitive overload during long study sessions.
*   **Tactile Depth:** The interface should feel like layered sheets of heavy-stock paper or frosted glass, not a flat screen.

---

## 2. Color Palette: Deep Charcoal, Indigo & Sakura
The palette is rooted in low-strain, sophisticated tones that prioritize eye comfort without sacrificing professional authority.

### Core Tones
*   **Background (`#101223`):** A deep, midnight slate. Never use `#000000`. This base allows for softer contrast and richer tonal depth.
*   **Primary Accent - Sakura Pink (`#FBB3C1`):** Used sparingly for high-intent actions. It represents the "spark" of insight within the dark study space.
*   **Secondary - Muted Indigo (`#BAC3FF`):** Used for supporting information and calming visual cues.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. 
Boundaries must be defined solely through background color shifts or tonal transitions. To separate content, place a `surface-container-low` section against a `surface` background. The "line" is perceived by the eye through color change, not drawn by a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack. Use the surface-container tiers to create nested depth:
*   **Base Layer:** `surface` (`#101223`)
*   **Secondary Layer:** `surface-container-low` (`#181A2C`)
*   **Floating/Active Layer:** `surface-container-highest` (`#323347`)

### The Glass & Gradient Rule
To achieve a premium "Editorial" feel, use **Glassmorphism** for floating headers or navigation bars. Use `surface` colors at 70% opacity with a `20px` backdrop-blur. 
*   **Signature Texture:** For Hero CTAs, apply a subtle linear gradient from `primary` (`#FFD9DF`) to `primary-container` (`#FBB3C1`) at a 135-degree angle to provide a soft, glowing "soul" to the component.

---

## 3. Typography: Modern Professionalism
We utilize **Plus Jakarta Sans** across all levels to maintain a clean, contemporary Japanese-inspired aesthetic. The hierarchy is designed for maximum legibility during intense study.

*   **Display (3.5rem - 2.25rem):** Set with tight letter-spacing (-0.02em). Use for high-impact editorial moments.
*   **Headline (2rem - 1.5rem):** The "Workhorse" for section titles. Bold weights convey authority.
*   **Title (1.375rem - 1rem):** Used for card headers and navigation.
*   **Body (1rem - 0.75rem):** Increased line-height (1.6) is mandatory for body copy to ensure "The Nocturnal Atelier" remains readable over hours of use.
*   **Label (0.75rem - 0.6875rem):** Uppercase with increased letter-spacing (+0.05em) for small metadata.

---

## 4. Component Philosophy: Depth Through Tonal Layering
We replace structural lines with the **Layering Principle**. 

### Elevation & Shadows
*   **Ambient Shadows:** When an element must "float" (e.g., a modal or a primary FAB), use an extra-diffused shadow. 
    *   *Spec:* `offset-y: 12px`, `blur: 40px`, `color: rgba(11, 13, 30, 0.4)`. 
    *   Never use grey/black shadows; always tint the shadow with the `surface-container-lowest` value.
*   **The Ghost Border:** If accessibility requires a border, use `outline-variant` (`#514345`) at **15% opacity**. It should be a suggestion of a container, not a cage.

### Primitive Components
*   **Buttons:** 
    *   *Primary:* Sakura Pink (`primary_container`) with `on_primary_container` text. Shape: `Round Full`.
    *   *Tertiary:* No background, no border. Use Muted Indigo text.
*   **Cards:** Forbid divider lines. Separate content using the Spacing Scale (e.g., `spacing-6` between header and body) and subtle background shifts from `surface-container-low` to `surface-container-high`.
*   **Input Fields:** Use a filled style with `surface-container-highest`. No bottom line. On focus, transition the background color slightly and add a soft Sakura glow (2px outer spread).
*   **Chips:** Selection chips should use the `secondary_fixed_dim` color with `Round Full` corners to appear like smoothed river stones.

---

## 5. Imagery: Atmospheric & Low-Contrast
Visuals must support the "Nocturnal Atelier" theme. Avoid bright, daylight photography or saturated stock images.

*   **Treatment:** All photography should have a slight "Noir" or "Muted Indigo" wash. Reduce contrast and lift the blacks to ensure images blend into the `#101223` background.
*   **Subject Matter:** Focus on Japanese-inspired minimalism—shadows on shoji screens, macro shots of ink brushes, or softened city lights of Tokyo at night.
*   **The "Vignette" Effect:** Use soft radial gradients on image containers that fade into the background color, making the image feel like it is emerging from the dark.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use `Round Full` for all interactive elements (buttons, chips, tags) to maintain the "Soft" aesthetic.
*   **Do** use the Spacing Scale religiously. Consistent white space is what makes a layout feel "Editorial" rather than "App-like."
*   **Do** favor tonal shifts (e.g., moving from `surface` to `surface-container`) to guide the user's eye.

### Don't:
*   **Don't** use 100% white text. Use `on_surface` (`#E0E0FA`) to reduce eye strain.
*   **Don't** ever use a 1px solid border for layout separation.
*   **Don't** use sharp 90-degree corners. Even the most "serious" component should have at least the `sm` (0.5rem) radius.
*   **Don't** overcrowd the screen. If in doubt, increase the spacing by one level on the scale.