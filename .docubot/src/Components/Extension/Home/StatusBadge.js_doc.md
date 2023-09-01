File: /app/filebot-store-000/chrome-extension/src/Components/Extension/Home/StatusBadge.js

This file defines the `StatusBadge` component which is a part of the application's Chrome extension.  

Key functionalities and features:

1. It uses React Hooks and the styled-components library of React for styling.
2. The `StatusBadge` function component accepts a `state` prop and returns a Wrapper component customized based on the state.
3. `statusMap` is an object that maps different states to their respective background colors and text.
4. The `Wrapper` is a styled `div` component with predefined styles. The background color for Wrapper changes dynamically based on the `state`.
5. The state prop passed to `StatusBadge` function is used to fetch the corresponding color code and display text from `statusMap`.
6. Statuses include: 'merge', 'pre-open', 'new', 'conflict', 'close', and 'open'. Each status has a specific color and text associated.

This component is useful to visually represent a status by displaying a badge with a specific color and text derived from the passed state.