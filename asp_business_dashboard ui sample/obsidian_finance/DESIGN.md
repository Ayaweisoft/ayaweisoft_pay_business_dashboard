---
name: Obsidian Finance
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b24'
  surface-container: '#1d1f29'
  surface-container-high: '#282933'
  surface-container-highest: '#33343e'
  on-surface: '#e2e1ef'
  on-surface-variant: '#c4c5d9'
  inverse-surface: '#e2e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#8e90a2'
  outline-variant: '#434656'
  surface-tint: '#b8c3ff'
  primary: '#b8c3ff'
  on-primary: '#002388'
  primary-container: '#2e5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#124af0'
  secondary: '#dcfdff'
  on-secondary: '#00373a'
  secondary-container: '#00f1fd'
  on-secondary-container: '#006a6f'
  tertiary: '#ffb59b'
  on-tertiary: '#5b1a00'
  tertiary-container: '#c24100'
  on-tertiary-container: '#ffece6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#6ff6ff'
  secondary-fixed-dim: '#00dce6'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f53'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812800'
  background: '#11131c'
  on-background: '#e2e1ef'
  surface-variant: '#33343e'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  numeric-data:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
---

## Brand & Style

This design system targets high-net-worth individuals and sophisticated retail traders who demand precision and aesthetic excellence. The brand personality is authoritative yet futuristic, leveraging a high-fidelity **Glassmorphism** style to create a sense of depth and layered information. 

The emotional response is one of "secure transparency." By utilizing translucent layers and deep, dark backgrounds, the interface feels expansive and premium. The visual language balances the cold efficiency of fintech with soft, organic gradients and blurred backdrops to ensure the platform feels approachable and modern rather than purely industrial.

## Colors

The palette is optimized for a **Dark Mode Default** experience. The Primary Blue is a high-vibrancy cobalt, ensuring interactive elements stand out against deep neutral backgrounds. 

- **Primary & Secondary:** Used for branding and primary actions. The blend of Primary Blue and Secondary Cyan creates the core gradient for high-intent actions.
- **Functional Colors:** Success Green and Danger Red are saturated for immediate recognition in high-stakes financial environments, utilized for P&L indicators and destructive actions.
- **Neutrals:** A custom range of "Obsidian" greys with slight blue tints to prevent the UI from feeling "dead" or purely monochromatic.

## Typography

This design system utilizes **Manrope** for headlines to provide a modern, geometric character that feels refined. **Inter** is chosen for all body and UI labels due to its exceptional legibility and support for tabular figures (`tnum`), which is critical for aligning financial data columns and balance sheets.

Headlines use tight tracking and heavy weights to anchor the page, while body text maintains generous line heights to ensure readability during prolonged sessions. Numeric data always defaults to medium or semi-bold weights to ensure financial figures are the most legible elements on the screen.

## Layout & Spacing

A strict **8px base system** governs all spatial relationships. The layout uses a 12-column fluid grid for desktop to handle complex data dashboards, while a 4-column grid ensures accessibility on mobile.

Spacing is used to group related financial concepts—smaller gaps (8px-16px) for internal card elements and larger gaps (48px+) to separate distinct functional modules like a "Portfolio Overview" from "Recent Transactions."

## Elevation & Depth

Depth in this design system is achieved through **Glassmorphism** and backdrop-filter techniques rather than traditional shadows.

1.  **Level 0 (Base):** Deep Obsidian (#05070A) background.
2.  **Level 1 (Cards):** Translucent surface (White @ 4% opacity) with a 20px backdrop blur and a 1px subtle border (White @ 10% opacity).
3.  **Level 2 (Modals/Popovers):** Higher translucency (White @ 8% opacity) with a 40px backdrop blur and a soft, diffused outer glow (Primary Blue @ 15% opacity).

This creates a "stacked glass" effect where the hierarchy is determined by the intensity of the blur and the brightness of the border stroke.

## Shapes

The design system uses a **rounded (2)** approach to offset the technical nature of financial data.
- **Base Components:** 8px (0.5rem) for inputs and small buttons.
- **Large Components:** 16px (1rem) for standard containers.
- **Feature Cards (rounded-xl):** 24px (1.5rem) for main glassmorphic containers to emphasize the high-fidelity, premium aesthetic.

## Components

### Buttons
Primary buttons utilize a linear gradient (Primary Blue to Secondary Cyan) at a 135-degree angle. They feature a subtle outer glow that pulses slightly on hover. Secondary buttons use the Glassmorphism style with a white-tinted border.

### Glassmorphic Cards
These are the signature container. Each card must have:
- `backdrop-filter: blur(20px)`
- `background: rgba(255, 255, 255, 0.04)`
- `border: 1px solid rgba(255, 255, 255, 0.1)`
- Corner radius: `rounded-xl` (24px).

### Inputs
Financial data inputs are "Large" (56px height) to accommodate touch and high-visibility. They feature a dark-fill background with a subtle border that glows Primary Blue when focused. Labels are placed above the input in the `label-sm` style.

### Animations
- **Success Checkmarks:** Use a "draw" animation for the SVG path, followed by a subtle scale bounce.
- **Loading Pulses:** Background surfaces should use a linear gradient shimmer (Skeleton loading) that moves from left to right over 1.5 seconds.
- **Micro-interactions:** Hovering over a card should slightly increase the backdrop blur and border opacity.