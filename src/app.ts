import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import config from './config';
import globalErrorhandler from './app/middlewares/globalErrorHandler';
import { routes } from './app/routes';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send(`Rig builder server running on PORT ${config.port}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// middleware
app.use(globalErrorhandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
