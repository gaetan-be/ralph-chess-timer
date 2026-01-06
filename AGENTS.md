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
