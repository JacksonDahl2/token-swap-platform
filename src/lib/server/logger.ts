import winston from "winston";
import settings from "./settings";

const _settings = settings();
if (_settings instanceof Error) {
  throw new Error(_settings.message);
}

// development / production environment uses
const isProduction = process.env.NODE_ENV === "production";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: isProduction
        ? winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          )
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: "HH:mm:ss" }),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
              const metaStr = Object.keys(meta).length
                ? `\n${JSON.stringify(meta, null, 2)}`
                : "";
              return `${timestamp} [${level}]: ${message}${metaStr}`;
            }),
          ),
    }),
  ],
});

export default logger;
