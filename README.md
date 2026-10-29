# Reveal stack

Run `npm install`, then `npm run dev`. Validate with `npm run build` and `npm test` (requires Google Chrome).

```tsx
<div style={{ height: 260 }}>
  <Stack animate itemSize={80} gap={12} reverse={false} overflowDirection="bottom">
    <FirstItem />
    <SecondItem />
  </Stack>
</div>
```

Each direct React child occupies a fixed-size item (`itemSize` in pixels, default `64`) along the overflow axis, with an actual CSS grid gap (`gap` in pixels, default `8`) between items and no outer gap. Give the parent an explicit width and height. Arrays are flattened by React.Children; fragments are a single slot. Use stable keys for dynamic children.

<img width="800" height="478" alt="image" src="https://github.com/user-attachments/assets/a998a762-09b9-41da-b7e4-de7be9d2d286" />

`reverse` reverses visual and DOM order. `overflowDirection="bottom"` keeps the beginning, anchored at the top; `"top"` keeps the end, anchored at the bottom. `"right"` keeps the beginning anchored at the left; `"left"` keeps the end anchored at the right. CSS custom properties assign grid positions. Each overlapping grid has the same tracks and uses `gap: var(--gap)`. Each full-size slot wrapper converts its order-based required size into a font-size; one shared `inline-size >= 1em` container query controls visibility (wrapper writing-mode selects the measured axis; content remains horizontal), including when the parent resizes without a React render. Hidden rows stay mounted but are excluded from keyboard navigation and the accessibility tree through visibility:hidden. Avoid overriding visibility on descendants. Content must fit its fixed row. Item text is reset to 1rem because the wrapper font-size encodes its breakpoint.

Requires CSS size container queries (Chrome/Edge 105+, Firefox 110+, Safari 16+). Unsupported browsers hide all rows. No DOM measurements, observers or show/hide state.

Container query reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type

`itemSize` must be a positive, finite number; invalid values throw a RangeError. It controls height for top/bottom and width for left/right. Changes update both grid tracks and the CSS fit threshold.

`animate` (default `false`) enables a 180ms CSS opacity transition when items become fully visible. Overflowing items hide immediately to avoid partial rows; resizing and reordering are not animated. Reduced-motion preferences disable the transition.

`gap` accepts finite, non-negative pixel values, including `0`; invalid values throw a RangeError. The same value drives grid spacing and the fit threshold.
