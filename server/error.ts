import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { CustomError } from '../pkg/error/customError.js';

export function setupErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err: Error | ZodError, req, res) => {
    let status: number = 500;
    let message = `Internal server error.`;
    let validationErrors;

    if (err instanceof ZodError) {
      status = 400;
      message = `Bad request.`;
      validationErrors = err.errors.map((error) => ({
        path: error.path.join('.'),
        message: error.message,
      }));
    }

    if (err instanceof CustomError) {
      status = err.getStatusCode();
      message = err.getMessage();
    }

    res.status(status).send({ error: message, validationErrors });
  });
}
