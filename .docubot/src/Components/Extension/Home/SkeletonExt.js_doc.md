**File:** `/app/filebot-store-000/chrome-extension/src/Components/Extension/Home/SkeletonExt.js`

**Description:**

This is a React component file that exports a styled skeleton loading screen for the Chrome extension. The file utilizes the React Hooks, `useState` & `useEffect`, along with styled-components for creating styled elements.

**Components:**

1. `SkeletonGrid` - Grid layout with two columns and three rows, with a gap of 0 px, and a height of 370 px.

2. `SkeletonButton` - A flex container that is centered in both directions with a left margin of 50 px.

3. `SkeletonButtonLeft` - Styled variant of SkeletonButton, justified to the right end incorporating right margin delta and bottom margin delta for graphical placement and alignment.

4. `SkeletonButtonRight` - Styled variant of SkeletonButtonLeft, with increased right margin and start flex justification.

5. `SkeletonVotePower` - Styled version of SkeletonButton, justified to the right end with a large bottom margin delta.

6. `TopLineSkeleton` - A styled element with a top margin of 5px, used to arrange Skeleton components vertically.

7. `DecisionSkeleton` - Styled element used with a left margin of 50px.

8. `SkeletonVoteRows` - Styled element with a negative top margin for stylistic positioning of rows.

9. `SkeletonModal` - Main exported function. It returns the skeleton screen consisting of a `SkeletonGrid` and a div container that holds multiple Skeleton components within a `TopLineSkeleton` container.

**How it Works:**

When the SkeletonModal function is called, it returns a loading screen with placeholder content during data loading. It uses the Skeleton component from @mui/material to create loading animations.