# Angular-Electron Monorepo

This project is a monorepo that combines an Angular frontend with an Electron shell and a Node.js backend. The application is a desktop app that allows users to search for items, which are fetched from an external API via the Node.js server.

## Project Structure

The monorepo is organized into two main packages:

- `angular/`: Contains the Angular frontend application and the Electron shell configuration.
- `node-server/`: Contains the Node.js backend server (built with Express.js).

This structure allows for a clear separation of concerns between the frontend, backend, and desktop application logic.

## Architecture Overview

The application consists of three main parts:

1.  **Angular Frontend**: A single-page application that provides the user interface. It communicates with the `node-server` to fetch data and with the Electron main process for desktop-specific functionalities (like opening external links). For more details, see the [`angular/README.md`](./angular/README.md).

2.  **Node.js Backend**: An Express.js server that acts as a proxy between the Angular app and an external API. This abstracts the data fetching logic and handles CORS. For more details, see the [`node-server/README.md`](./node-server/README.md).

3.  **Electron Shell**: Wraps the Angular application in a native desktop window. It manages the application's lifecycle and provides access to native OS functionalities through a secure IPC bridge.

## Getting Started

To get the application running locally, you'll need to have Node.js and pnpm installed.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd angular-electron
    ```

2.  **Install dependencies:**
    This project uses `pnpm` workspaces. To install all dependencies for both the `angular` and `node-server` packages, run the following command from the root directory:
    ```bash
    pnpm install
    ```

### Running the Application

To run the application, you need to start both the `node-server` and the `angular` (Electron) application.

1.  **Start the Node.js Server:**
    Open a terminal, navigate to the `node-server` directory, and run:

    ```bash
    pnpm start
    ```

    This will start the backend server, typically on port 3001.

2.  **Start the Electron Application:**
    In a separate terminal, navigate to the `angular` directory and run:
    ```bash
    pnpm start:dev
    ```
    This will build the Angular application and launch it within an Electron window. The application will automatically connect to the Node.js server.

## Building for Production

To build the application for production, you can use the build scripts defined in the `package.json` files of each package.

1.  **Build the Node.js Server:**

    ```bash
    cd node-server
    pnpm build
    ```

2.  **Build and Package the Electron Application:**
    ```bash
    cd angular
    pnpm build:electron
    ```
    This will create a distributable package for your operating system in the `angular/dist` directory.

### Note

If for some reason the `pnpm install` at roots fails the electron app, go to the `angular` project folder and make the `pnpm install` manually, and then run the projects concurrently.
