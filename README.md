# Secure Rate-Limited API

## Description
A secure backend API for task management with JWT authentication, rate limiting, and audit logging.

## Tech Stack
- Backend Framework: NestJS
- Database: PostgreSQL
- ORM: TypeORM
- Auth: JWT + Passport
- Validation: class-validator
- Rate Limiting: @nestjs/throttler

## Features
- User authentication (JWT)
- Rate limiting (5 requests per minute)
- Task management
- Action logging

## Database Design (ERD)

The database schema is designed to ensure scalability, security, and clear relationships between entities.

### Entities
- **Users**: Stores user authentication and authorization data.
- **Tasks**: Represents tasks created and managed by users.
- **Logs**: Stores audit logs for critical user actions (e.g., login, task creation, deletion).

### Relationships
- One user can have multiple tasks.
- One user can generate multiple logs.
- Each task can be associated with multiple logs.

## Database Design (ERD)

The following diagram illustrates the relationships between Users, Tasks, and Logs.

![Database ERD](./docs/secure-rate-limited-api-db.png)

ERD Source:
- https://dbdiagram.io/d/secure-rate-limited-api-db-697ea101bd82f5fce23ba997
