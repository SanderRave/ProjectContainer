# Website Containers Project

## Overview

This project provides a standardized container solution for websites. It consists of a **frontend**, **backend**, and optionally a **MySQL database**, all managed through Docker Compose. The setup supports live reloading, scalable configurations, and environment-based adjustments.

---

## Functional Components

### 1. Database Tools (Optional)

- **MySQL Workbench**: A tool for managing MySQL databases.

### 2. Frontend Frameworks and Libraries

- **Tailwind CSS**: A utility-first framework for efficient mobile-first and responsive styling.
- **React.js**: A dynamic, component-based frontend library.
- **Node.js**: Used as the runtime for JavaScript.
- **Vite**: For fast builds and live reloading.
- **GSAP**: A library for smooth animations.
- **Three.js**: For creating 3D environments and rendering.
- **P5.js**: For experimental artwork and generative design.

### 3. Backend Frameworks

- **Node.js + Express**: A lightweight and fast backend framework for dynamic API routes and REST API interaction.
- **PHP (WordPress CMS)**: For connecting to and managing WordPress systems when needed.

### 5. Swagger API Documentation

- **Swagger UI**: Provides an interactive API documentation interface available at `/api-docs`.
- **Configuration**: Swagger documentation is loaded from the `swagger.json` file located in the `docs` directory. If this file is unavailable or malformed, the application will log an error and skip loading the Swagger UI.

### 6. WordPress Integration

- **API Support**: The backend supports fetching posts from a WordPress site using its REST API.
- **Environment Variable**: The `WORDPRESS_API_URL` must be defined in the `.env` file for the `/api/posts` route to function correctly.

---

## Containers

1. **Frontend**: React app using Vite for fast development cycles.
2. **Backend**: Express.js server capable of connecting to a MySQL database.
3. **Database** (optional): MySQL database configured for persistence within Docker.

---

## Features

### Frontend

- Runs on port **5173**.
- Provides a fast development environment with hot-reloading via Vite.
- Configurable via `.env` for port settings.

### Backend

- Runs on port **3000**.
- Supports WordPress API integration via the `/api/posts` route.
- Optionally connects to a MySQL database using the `USE_DATABASE` environment variable.
- Includes Swagger API documentation at `/api-docs`.
- Configurable via `.env` for dynamic port management and WordPress integration.

### Database

- Runs within the Docker network.
- Configured for internal use only (not exposed to external networks).
- Optional and only enabled if `USE_DATABASE=true` in the environment variables.

---

## Environment Variables

The project uses a `.env` file to manage configurations. Here are the key variables:

```env
# Frontend
FRONTEND_PORT=5173

# Backend
BACKEND_PORT=3000
USE_DATABASE=false
WORDPRESS_API_URL=https://your-wordpress-site.com

# Database (optional)
MYSQL_USER=root
MYSQL_PASSWORD=rootpassword
MYSQL_DATABASE=my_database
MYSQL_PORT=3306
```

---

## Instructions

### Build and Start the Containers

1. Clone this repository:

   ```bash
   git clone https://github.com/<your-repository>.git
   cd nieuw-project
   ```

2. Create a `.env` file in the root directory with the required variables:

   ```env
   FRONTEND_PORT=5173
   BACKEND_PORT=3000
   USE_DATABASE=false
   WORDPRESS_API_URL=https://your-wordpress-site.com
   MYSQL_USER=root
   MYSQL_PASSWORD=rootpassword
   MYSQL_DATABASE=my_database
   MYSQL_PORT=3306
   ```

3. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

4. Access the services:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3000](http://localhost:3000)
   - Swagger API Documentation: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Development Tips

1. **Live File Updates:**

   - The frontend and backend containers support live reloading. Changes to source files on your host machine are reflected immediately in the containers.

2. **Frontend Development:**

   - Vite runs the development server with hot-reloading enabled.

3. **Backend Development:**

   - Use tools like `nodemon` for automatic restarts when files change (already configured).

4. **Healthchecks:**

   - The backend and frontend services include healthchecks to ensure they are running as expected.

5. **Swagger Debugging**:

   - If the `swagger.json` file is not present or malformed, the application will log an error:

     ```
     Failed to load swagger.json: <error message>
     Swagger documentation not available. Check swagger.json.
     ```

   - Ensure the file is located at `docs/swagger.json` relative to the project root and contains valid JSON.

6. **WordPress Integration**:

   - The `/api/posts` route fetches posts from a WordPress site. Ensure the `WORDPRESS_API_URL` variable is set in `.env`.

   - Example:

     ```env
     WORDPRESS_API_URL=https://example.com
     ```

   - If the variable is not set, the route will return a `503` error indicating that the URL is missing.

---

## Additional Notes

1. **Volumes:**

   - Project files are mapped to the containers via Docker volumes to ensure live updates during development.

2. **Networking:**

   - The frontend and backend run in a single container, so no inter-container networking is required.

3. **Logs:**

   - View logs for debugging:
     ```bash
     docker logs nieuw-project-frontend-1
     docker logs nieuw-project-backend-1
     ```

4. **Orphan Containers:**
   - Remove unused containers with:
     ```bash
     docker-compose up -d --remove-orphans
     ```

---

## Future Improvements

- **Add CI/CD pipelines**: Automate builds and deployments.
- **Database scaling**: Introduce database replication for better performance.
- **Dynamic environments**: Configure multiple `.env` files for development, staging, and production.
