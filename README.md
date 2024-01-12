# Monorepo Node/Express/Prisma

A boilerplate of a monorepo made using Node, Express and Prisma. In addition to the Serverless Framework for deploying lambdas functions and integration with the AWS SQS messaging service.

## Key Technologies

- **Node.js**
- **Express**: Web framework for Node.js.
- **PostgreSQL/Prisma**: Relational database and ORM for Node.js.
- **Redis**: Cache storage system.
- **Lerna/Yarn Workspace**: Monorepo and dependency management.
- **Joi**: Data validation library for Node.js.
- **JWT (JSON Web Tokens)**: Token-based authentication.
- **AWS Lambda**: Serverless computing platform.
- **AWS SQS (Simple Queue Service)**: Message queuing service.
- **Swagger**: API documentation tool.

## Monorepo Structure

- packages/
    - api: routes, controllers, middlewares, validators.
    - core: services, prisma config.
    - worker: Lambda service (SQS).

## Configuration and Installation

```bash
# Install dependencies
yarn

# Start API
yarn start:api

# Start Worker
yarn start:worker