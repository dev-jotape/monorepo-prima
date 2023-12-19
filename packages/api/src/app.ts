import express from 'express';
import routes from './routes';
import { config } from '@boilerplate-node/core';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const PORT = config.port || 3000;
const app = express();

// swagger documentation
const options = {
  swaggerDefinition: {
      openapi: '3.0.1',
      info: {
          description:
              'Swagger UI for impactMarket API. To generate signatures use https://etherscan.io/verifiedSignatures',
          version: '1.0.0',
          title: 'impactMarket',
          license: {
              name: 'Apache 2.0',
              url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
          }
      },
      tags: [
          {
              name: 'users',
              description: 'Everything about your users'
          },
          {
              name: 'tasks',
              description: 'Manage tasks'
          },
      ],
      servers: [
        {
            url: `http://localhost:${PORT}/api`
        }
      ],
      schemes: ['http'],
      components: {
          securitySchemes: {
              BearerToken: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT'
              },
          }
      }
  },
  apis: [
      path.join(__dirname, './routes/**/*.ts'),
      path.join(__dirname, '../../core/src/services/**/*.ts'),
  ]
};
const swaggerSpec = swaggerJsdoc(options);

console.log(swaggerSpec);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(routes());

// error handling - Joi validation
app.use((error, req, res, next) => {
  if (error && error.toString().indexOf('Validation failed') !== -1) {
      return res.status(400).json({
          success: false,
          error: {
              name: 'INVALID_PAYLOAD',
              message: 'invalid payloads',
              details: error.details.get('query')
                  ? error.details.get('query').details
                  : error.details.get('body').details
          }
      });
  }
  next();
});

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT)
});