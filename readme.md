# Forum Project

A monorepo containing a Next.js frontend and Express backend for the Open University Forum website.

## Project Structure

```bash
forum-project/
├── frontend/         # Next.js web application
├── backend/          # Express server
├── package.json      # Root package.json for workspace configuration
└── yarn.lock        
```

## Prerequisites

- Node.js (v18 or higher)
- Yarn

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables:
```bash
# frontend/.env.local
API_URL=http://localhost:4000

# backend/.env
PORT=4000
```

## Development

Run frontend and backend in development mode:

```bash
# Run frontend (Next.js)
yarn workspace frontend dev

# Run backend (Express)
yarn workspace backend dev
```

The services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Build

Build both applications:

```bash
# Build frontend
yarn workspace frontend build

# Build backend
yarn workspace backend build
```

## Production

To run the built applications:

```bash
# Run frontend
yarn workspace frontend start

# Run backend
yarn workspace backend start
```

## Project Overview

### Frontend (Next.js)
- TypeScript-based Next.js application
- ShadCN/UI components
- TailwindCSS for styling
- Authentication using Clerk
- Deployed on Vercel

### Backend (Express)
- TypeScript Express server
- PostgreSQL database with Drizzle ORM
- RESTful API endpoints
- Authentication middleware

## Contributing

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git commit -m "feat: add your feature"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

## License

MIT

