# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Node.js Express API called "acquisitions" built with ES modules. It implements a production-ready authentication system using JWT tokens, PostgreSQL with Drizzle ORM, and comprehensive logging with Winston.

## Common Development Commands

### Development Server
```bash
npm run dev              # Run with auto-reload using Node --watch
```

### Database Operations  
```bash
npm run db:generate      # Generate Drizzle migrations from models
npm run db:migrate       # Apply pending migrations
npm run db:studio        # Launch Drizzle Studio GUI
```

### Code Quality
```bash
npm run lint             # Check code with ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## Architecture Overview

### Module System
- **ES Modules**: Uses `"type": "module"` with import/export syntax
- **Path Aliases**: Configured with Node.js import maps using `#` prefix:
  - `#config/*` → `./src/config/*`
  - `#controllers/*` → `./src/controllers/*`
  - `#middleware/*` → `./src/middleware/*`
  - `#models/*` → `./src/models/*` 
  - `#routes/*` → `./src/routes/*`
  - `#services/*` → `./src/services/*`
  - `#utils/*` → `./src/utils/*`
  - `#validators/*` → `./src/validators/*`

### Application Structure
- **Entry Point**: `src/index.js` loads environment variables and starts server
- **App Configuration**: `src/App.js` contains Express middleware setup and route mounting
- **Server**: `src/server.js` starts the HTTP server on configured port

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Models**: Defined in `src/models/` using Drizzle's pgTable schema
- **Migrations**: Generated in `drizzle/` directory
- **Connection**: Configured in `src/config/database.js` with Neon serverless driver

### Authentication Architecture
- **JWT Tokens**: Stored in HTTP-only cookies for security
- **Password Hashing**: Uses bcrypt with salt rounds of 10
- **Role-based**: Supports 'user' and 'admin' roles
- **Validation**: Zod schemas for request validation

### Middleware Stack (in order)
1. CORS
2. Helmet (security headers)
3. JSON body parsing
4. Cookie parser
5. URL-encoded body parsing
6. Morgan HTTP logging (via Winston stream)

### Logging System
- **Winston Logger**: Configured in `src/middleware/logger.js`
- **File Outputs**: `logs/error.log` (errors only), `logs/combined.log` (all logs)
- **Console Output**: Development only, with colorized formatting
- **HTTP Logging**: Morgan integrated with Winston stream
- **Log Levels**: Configurable via LOG_LEVEL environment variable

## Key Implementation Details

### Environment Variables Required
- `DATA_BASEURL`: PostgreSQL connection string (Neon)
- `PORT_ENV`: Server port (defaults to 4000)  
- `JWT_SECRET`: JWT signing secret
- `LOG_LEVEL`: Winston log level (defaults to 'http')
- `NODE_ENV`: Environment ('production' affects cookie security and console logging)

### Error Handling Pattern
Controllers use try-catch with:
1. Zod validation using `safeParse()`
2. Service layer calls for business logic
3. Winston error logging
4. Appropriate HTTP status codes
5. `next(e)` for unhandled errors

### Security Features
- Helmet for security headers
- HTTP-only cookies with proper flags (secure in production, SameSite strict)
- Password hashing with bcrypt
- Input validation with Zod
- CORS enabled

### Code Style
- **ESLint**: Enforces 2-space indentation, single quotes, semicolons
- **Prettier**: 80 character line width, trailing commas ES5, LF line endings
- **Import Style**: ES modules with path aliases, no relative imports for src/ files

## File Structure Notes

### Routes Pattern
Routes are defined in `src/routes/` and mounted on specific paths in App.js:
- `/api/auth` → auth.router.js (signup, signin, signout endpoints)
- `/health` → health check endpoint in App.js

### Service Layer Pattern  
Business logic is separated into services (e.g., `auth.service.js`):
- Database operations
- Password hashing
- User creation logic
- Error handling with descriptive messages

### Utility Functions
Reusable utilities in `src/utils/`:
- JWT token operations (currently incomplete implementation)
- Cookie management with security defaults
- Validation error formatting

### Current Issues to Note
1. JWT utility (`src/utils/jwt.js`) has incomplete implementation - sign function is empty
2. Typo in validator filename: `auth.valadator.js` should be `auth.validator.js`
3. Missing bcrypt dependency in package.json but used in auth.service.js
4. Missing helmet and cookie-parser dependencies but used in App.js and routes

## Testing Patterns
ESLint is configured with globals for common test frameworks (Jest, Mocha) in the `tests/**/*.js` file pattern, suggesting tests should be placed in a `tests/` directory.