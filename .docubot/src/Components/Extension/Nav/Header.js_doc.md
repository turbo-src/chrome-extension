**File**: Header.js

**Location**: /app/filebot-store-000/chrome-extension/src/Components/Extension/Nav/

**Description**: This file exports a Header component for the Chrome extension.

This component includes:

1. The header, which is rendered as a div.
2. An icon (turbo-src48.png), which when clicked, navigates the user to the 'home' page.
3. A commented-out support section with a 'Get Help' link.
4. A user avatar, which defaults to null if there's no avatar URL. When the avatar is clicked, it takes the user to the '/account' page; if there's no avatar, no image will display.

The state of the user is fetched using the `useSelector` hook from Redux, specifically pulling from `state.auth.user`.

This component uses React Router Dom's `useNavigate` for routing purposes and the `useSelector` hook from Redux for state management.