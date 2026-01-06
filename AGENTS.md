# Agent Learnings

## React & Tailwind Patterns

### Flexbox Layout
- When creating vertical splits with flex, use `flex flex-col` not just `flex`
- `flex` alone defaults to `flex-row` which creates horizontal layout
- For vertical splits: `flex flex-col` with `h-1/2` on children
- For horizontal splits: `flex` (or `flex-row`) with `w-1/2` on children

### Timer Implementation
- Use `useRef<number | null>(null)` for storing interval IDs in React
- Always clear intervals in useEffect cleanup function
- Window.setInterval returns a number type in browser environment

### Modal Overlays
- Use absolute positioning with `inset-0` for full-screen modal overlays
- Layer structure: background overlay (semi-transparent black) + centered content container
- Use `z-index` to control stacking: buttons should be z-10, modals z-20
- Background overlay pattern: `bg-black bg-opacity-50` for semi-transparent backdrop
- Center modal content: `flex items-center justify-center` on overlay container

### SVG Icons in React
- Inline SVG icons work well with Tailwind for simple icons
- Use `stroke="currentColor"` to make icons inherit text color from parent
- Standard icon sizing: `h-6 w-6` for medium-sized icons
- Add `aria-label` to icon-only buttons for accessibility
