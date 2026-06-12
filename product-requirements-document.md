# CADchat
## Full-Stack Interview Exercise
### Candidate Assessment

## Goal
Create a small frontend application using React, TypeScript, Supabase, Three.js, React Three Fiber, and React Three Drei. The application should render a simple 3D cube. When the cube is clicked, a UI panel should appear over or near the cube. From that panel, a user can add a design review comment. The comment should be persisted.

When the cube is clicked again later, the user should be able to approve or reject the comment, and that decision should also be persisted.

## Required Stack
- React
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- React Three Drei
- Node.js Backend API
- Supabase Database

## Core Requirements

### 1. 3D Viewer
Render a simple cube using Three.js and React Three Fiber. Use React Three Drei to display a UI component on or above the cube when the cube is clicked. The component should allow the user to:
- Add a comment
- View an existing comment
- Approve the comment
- Reject the comment

### 2. Data Persistence
Use Supabase to persist review data and ensure each review contains a status. Allowed statuses:
- pending
- approved
- rejected

### 3. Node.js API
Create a small Node.js API that sits between the frontend and Supabase. The frontend should not write directly to Supabase. The API should expose CRUD endpoints for review operations.

### 4. Frontend Behavior
When the user clicks the cube:
- Show the React Three Drei overlay component
- Fetch the current review from the API
- If no review exists, show a comment form
- If a pending review exists, show approve/reject controls
- If the review is approved or rejected, display the final status

### 5. Timebox
Please spend no more than 120 minutes. We are not looking for a polished production application. We care more about structure, tradeoffs, and your ability to explain your decisions.

## What We Will Evaluate
- React component structure
- TypeScript usage
- React Three Fiber and React Three Drei integration
- API design
- Supabase data modeling
- Separation between frontend, backend, and database
- Ability to explain tradeoffs
- Ability to make live changes during the interview

## Presentation
During the interview, be prepared to:
- Demo the cube interaction
- Explain how the overlay works
- Explain the API
- Explain the Supabase schema
- Discuss what you would improve with more time

## Submission
Upload code to a remote repository or submit the completed coding exercise prior to the final interview.

## Stretch Goal
Deploy the application to a live environment that we can access.