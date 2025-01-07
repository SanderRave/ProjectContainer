# Website Containers Project

## Overview

This project provides a standardized container solution for websites. It consists of a **frontend**, **backend**, and optionally a **MySQL database**, all managed through Docker Compose.

---

## Functional Components

### 1. Database Tools

- **MySQL Workbench**: A tool for managing MySQL databases.

### 2. Frontend Frameworks and Libraries

- **Tailwind CSS**: A utility-first framework for efficient mobile-first and responsive styling.
- **React.js**: A dynamic, component-based frontend library.
- **Node.js**: Used as the runtime for JavaScript.
- **GSAP**: A library for smooth animations.
- **Three.js**: For creating 3D environments and rendering.
- **P5.js**: For experimental artwork and generative design.

### 3. Backend Frameworks

- **Node.js + Express**: A lightweight and fast backend framework for dynamic API routes and REST API interaction.
- **PHP (WordPress CMS)**: For connecting to and managing WordPress systems when needed.

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

### Backend

- Runs on port **3000**.
- Optionally connects to a MySQL database using the `USE_DATABASE` environment variable.

### Database

- Runs within the Docker network.
- Configured for internal use only (not exposed to external networks).

---

## Instructions

### Build and Start the Containers

1. Clone this repository:
   ```bash
   git clone https://github.com/<your-repository>.git
   cd nieuw-project
   ```
