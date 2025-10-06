const winston = require('winston'); // Add to deps if needed
const logger = winston.createLogger({ level: 'info', format: winston.format.json(), transports: [new winston.transports.File({ filename: 'server-files/app.log' })] });
module.exports = logger;