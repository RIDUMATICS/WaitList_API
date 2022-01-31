import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import Router from './routes';
import Logger from './config/winston';
import { ErrorResp } from './interface';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
);

app.use('/api', Router);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: ErrorResp = {
    status: 404,
    message: 'Endpoint Not Found',
  };
  next(err);
});

app.use((
  err: ErrorResp,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status).send(err);
});

export default app;
