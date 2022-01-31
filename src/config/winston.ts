import { transports, createLogger, format, addColors } from 'winston';

const { combine, errors, printf, colorize, metadata } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
});

const Logger = createLogger({ levels });

Logger.add(
  new transports.Console({
    level: 'debug',
    handleExceptions: true,
    format: combine(
      colorize({ all: true }),
      metadata(),
      errors({ stack: true }),
      printf(({ level, message }: { [key: string]: string }) => {
        // formating the log outcome
        return `${level}: ${message}`;
      }),
    ),
  }),
);

export default Logger;
