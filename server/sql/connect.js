// 'use strict';
const mysql = require('promise-mysql');
import 'babel-polyfill';

// Create a Winston logger that streams to Stackdriver Logging.
const winston = require('winston');
const {LoggingWinston} = require('@google-cloud/logging-winston');
const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console(), loggingWinston],
});

let pool;
const createPool = async () => {
    pool = await mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    socketPath: `./cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
   
    connectionLimit: 5,
   
    connectTimeout: 10000, // 10 seconds
    
    acquireTimeout: 10000, // 10 seconds
   
    waitForConnections: true, // Default: true
   
    queueLimit: 0, // Default: 0
    //[END_EXCLUDE]
  });
  console.log('createPool')
  return pool
};

// export const pool = mysql.createPool({
//         user: process.env.DB_USER, // e.g. 'my-db-user'
//         password: process.env.DB_PASS, // e.g. 'my-db-password'
//         database: process.env.DB_NAME, // e.g. 'my-database'
//         socketPath: `./cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
       
//         connectionLimit: 5,
       
//         connectTimeout: 10000, // 10 seconds
        
//         acquireTimeout: 10000, // 10 seconds
       
//         waitForConnections: true, // Default: true
       
//         queueLimit: 0, // Default: 0
//         //[END_EXCLUDE]
//       });

export const connect_mysql = async function() {
    return await createPool();
}


