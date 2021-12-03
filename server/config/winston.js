// importando a winston
import winston, { format } from 'winston';
import appRoot from 'app-root-path';

// componentes para crear el formato perzonalizado
const { combine, timestamp, printf, uncolorize, json, colorize } = format;

// creando el perfil del color para log
const colors = {
  error: 'rojo',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'green',
};
//agregando al perfil a winston
winston.addColors(colors);

//formato de consola
const myFormat = combine(
  colorize({ all: true }),
  timestamp(),
  printf((info) => `${info.timestamp} ${info.level} ${info.message}`),
);

//formato para la salida de los archivos log
const myFileFormat = combine(uncolorize(), timestamp(), json());

//creando objetos de configuracion
const options = {
  infoFile: {
    level: 'info',
    Filename: `${appRoot}/server/logs/infos.log`,
    handleExceptions: true,
    maxsize: 5242880, //5mb
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: 'warn',
    Filename: `${appRoot}/server/logs/warns.log`,
    handleExceptions: true,
    maxsize: 5242880, //5mb
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: 'error',
    Filename: `${appRoot}/server/logs/errors.log`,
    handleExceptions: true,
    maxsize: 5242880, //5mb
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myFormat,
  },
};

//creando la instancia del logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infoFile),
    new winston.transports.File(options.warnFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, //no finaliza en excepcion manejada
});

//manejo de un stream de entrada
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
