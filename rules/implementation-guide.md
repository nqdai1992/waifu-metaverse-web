# Frontend Implementation Guide

## Core Technology Stack
- **UI Framework**: Use Radix UI as the primary component library. Customize components only when necessary using Radix's theming system or component overrides.
- **Language**: Use TypeScript for all source files (.ts, .tsx). Ensure proper type definitions and avoid `any` types.
- **Code Quality**: Configure and enforce ESLint for JavaScript/TypeScript linting and Stylelint for CSS linting.
- **Code Formatting**: Use Prettier for consistent code formatting across all files.

## Development Guidelines
- **Codebase Analysis**: Regularly analyze the existing codebase structure and patterns. Add specific implementation rules based on project needs and team conventions.
- **Design Implementation**:
  - When provided with design mockups or images, create a comprehensive design guide covering:
    - Layout structure and grid systems
    - Color palette and usage guidelines
    - Spacing system using T-shirt sizing (xs, sm, md, lg, xl, xxl)
    - Typography hierarchy and font sizes
    - Component mapping: identify and document which Radix components best match each design element
    - Create a visual component map showing the position and hierarchy of components on each screen
    - Ensure proper alignment and consistent spacing between elements
- **Icon Management**: Extract all SVG icons into separate, reusable React components. Store them in a dedicated icons directory and ensure they follow consistent naming conventions.
- **Code Quality**:
  - Regularly review and refactor code to improve readability and maintainability
  - Eliminate code duplication by creating reusable components and utilities
  - Simplify complex logic and break down large components into smaller, focused ones
  - Follow React best practices for component composition and state management
  - Always split to smaller components for reusability
  - Apply the folder-per-page pattern consistently across all new pages
- **Data Management**:
  - **Extract demo/mock/real data into custom React hooks**: Always separate demo/mock data from component presentation logic by creating dedicated custom hooks (e.g., `useRoadmapData`, `useSampleGoals`). Place these hooks in a `hooks/` subdirectory within the component folder following the folder-per-page architecture. This improves code organization, maintainability, and reusability while keeping components focused on rendering logic.