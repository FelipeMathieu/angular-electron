# Angular Application

This directory contains the frontend application built with Angular. It's designed to run within an Electron shell, but it can also be developed and tested as a standalone web application.

## Architecture

The application follows a modern Angular architecture, leveraging standalone components and a clear separation of concerns. State management is handled by `@ngneat/elf`, a reactive state management library, which provides a simple and predictable way to manage application state.

### Key Components and Services

- **`ItemsStore`**: The single source of truth for the items' state, managed by `@ngneat/elf`.
- **`ItemsCommandsAndQueriesService`**: Implements the Command Query Responsibility Segregation (CQRS) pattern.
  - **Queries**: Provide observables to read data from the store (e.g., `Items$`, `GetSelectedItem$`).
  - **Commands**: Provide methods to update the store (e.g., `SetItems`, `ResetStore`).
- **`SearchItemsService`**: Responsible for fetching data from the backend API. It calls the `node-server` and, upon receiving the data, uses the `ItemsCommandsAndQueriesService` to update the `ItemsStore`.
- **`HomeComponent`**: The main page, containing the search input. It uses `SearchItemsService` to trigger searches.
- **`ListItemsComponent`**: A presentational component that displays the list of items returned from the search. It subscribes to the `Items$` query to get the data.
- **`SelectedItemComponent`**: Displays the details of a selected item. It retrieves the item's data from the store using the item's ID from the route parameters. It also interacts with the Electron main process via the `electronAPI` to open external links.

## Electron Integration

The application is designed to run inside Electron. The communication between the Angular frontend (Renderer Process) and the Electron backend (Main Process) is handled securely via a `preload.ts` script.

- **`preload.ts`**: This script uses `contextBridge` to expose specific Node.js/Electron functionalities to the renderer process in a secure way. In this application, it exposes an `openExternal` function, allowing the Angular app to open URLs in the user's default browser.

## Development

To run the Angular application in a development environment, you can use the standard Angular CLI commands from within the `angular` directory.

```bash
# Install dependencies
pnpm install

# Run development server
pnpm start:dev

# Run tests
pnpm test
```
