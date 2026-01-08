# Agent Learnings

## React & Tailwind Patterns

### Flexbox Layout
- When creating vertical splits with flex, use `flex flex-col` not just `flex`
- `flex` alone defaults to `flex-row` which creates horizontal layout
- For vertical splits: `flex flex-col` with `h-1/2` on children
- For horizontal splits: `flex` (or `flex-row`) with `w-1/2` on children

### Dynamic Layout Switching
- Use template literals in className to toggle between layouts: `flex ${isVertical ? 'flex-col' : 'flex-row'}`
- Conditionally apply sizing classes: `${isVertical ? 'w-full h-1/2' : 'w-1/2 h-full'}`
- Boolean state works well for binary layout switches (vertical/horizontal)
- Apply conditional classes to child elements too (e.g., rotation): `className={isVertical ? 'rotate-180' : ''}`
- Empty string for false condition ensures clean className output

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

### Form Inputs & State Management
- Use controlled inputs with separate state for input value (string) vs application state
- Number inputs: use `type="number"` with `min` attribute for validation
- Parse and validate input values before applying to application state
- Input styling: `border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`
- Always use `htmlFor` on labels to associate with input `id` for accessibility

### Timer Reset Pattern
- When resetting timers, also reset `activePlayer` to null to stop the game
- Clear any running intervals before resetting state to prevent memory leaks
- Check if interval exists before clearing: `if (intervalRef.current) clearInterval(intervalRef.current)`
- Store configured duration in separate state to enable reset to original configured time
- Pattern: `configuredDuration` state maintains the target duration, allowing reset even after timers have counted down

### Button Positioning
- Center buttons horizontally: `left-1/2 transform -translate-x-1/2` for absolute positioned elements
- This pattern works well for centering icons in top navigation bars
- Combine with `absolute top-4` for consistent top margin across all control buttons

### Visual Flash Effects
- Use boolean state to control flash visibility with conditional rendering
- Create full-screen overlay with `absolute inset-0` and high z-index (e.g., z-30)
- `pointer-events-none` prevents overlay from blocking user interactions
- Use `animate-pulse` Tailwind class for pulsing effect
- Combine setTimeout with state setter to control flash duration
- Store timeout refs with `useRef<number | null>(null)` for cleanup
- Always clear timeouts in useEffect cleanup and reset functions to prevent memory leaks

### Background Images
- Use inline style for dynamic background images: `style={{ backgroundImage: 'url(...)' }}`
- Tailwind utilities for background: `bg-cover` (scales to cover), `bg-center` (centers image)
- Set opacity with Tailwind: `opacity-20` for 20% opacity
- Random placeholder images: use Lorem Picsum `https://picsum.photos/WIDTHxHEIGHT?random=ID` for reliable service
- Unsplash Source (source.unsplash.com) is deprecated and returns 503 errors - use Lorem Picsum instead
- Initialize background in useEffect with empty dependency array to load once on mount
- Layer behind content with `absolute inset-0` without high z-index (defaults to lower layer)
