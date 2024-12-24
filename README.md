# PERN Stack Application

This is a full-stack application built using the PERN (PostgreSQL, Express, React, Node.js) stack.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Structure

```
pern-app/
├── client/          # React frontend
├── server/          # Express backend
```

## Installation

1. Clone the repository
2. Install dependencies:

### Backend Setup
```bash
cd server
npm install
```

### Frontend Setup
```bash
cd client
npm install
```

### Database Setup
1. Create a PostgreSQL database
2. Update the database configuration in `server/config/db.js`

## Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Features

- Form with 5 fields for data input
- PostgreSQL database integration
- RESTful API endpoints
- React frontend with form validation
