# Node.js Server

This directory contains the backend server for the application, built with Node.js and Express.js. Its primary responsibility is to act as a proxy between the Angular frontend and an external API, abstracting the data-fetching logic and handling potential CORS issues.

## Architecture

The server follows a standard layered architecture, separating concerns into routes, controllers, and services.

- **`app.ts`**: The main entry point of the server. It sets up the Express application, configures middleware (JSON parsing, CORS), registers the API routes, and starts the server.
- **`config/config.ts`**: Manages the application's configuration using environment variables (`dotenv`). It defines the server port, the external API URL, and the allowed origins for CORS.
- **`routes/itemRoutes.ts`**: Defines the routes for the `/api/items` endpoint. It has a single `GET` route that is handled by the `getItems` controller.
- **`controllers/itemsController.ts`**: This controller handles the incoming requests for items. The `getItems` function extracts the `searchText` from the query parameters and calls the `fetchItems` service to get the data.
- **`services/itemServices.ts`**: This service is responsible for the business logic. The `fetchItems` function makes an HTTP GET request to an external API (defined in `config.ts`) to search for items based on the `searchText`. It uses `axios` to perform the request.

## API Endpoints

The server exposes the following endpoint:

### GET /api/items

- **Description**: Fetches a list of items based on a search query.
- **Query Parameters**:
  - `searchText` (string): The search term to query the external API.
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: An object containing the search results, typically in the format `{ "d": [...] }`.
- **Error Response**:
  - **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Error message" }`

## Environment Variables

To run the server, you need to create a `.env` file in the `node-server` directory with the following variables:

```
# The port the server will run on
PORT=3001

# The URL of the external API to fetch data from
API_URL=https://your-external-api.com

# The allowed origin for CORS (the Angular app's URL)
ORIGIN=http://localhost:4200
```

## Development

To run the server in a development environment, you can use the following commands from within the `node-server` directory:

```bash
# Install dependencies
pnpm install

# Run development server
pnpm start
```
