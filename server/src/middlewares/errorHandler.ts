import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message ?? 'Unexpected error';

  res.status(status).json({
    message,
  });
};

