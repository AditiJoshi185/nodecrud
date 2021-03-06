const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

exports.default = {
  PORT: process.env.PORT,
  MYSQL: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.MYSQLPORT,
    connection_limit: process.env.CONNECTION_LIMIT,
    database: process.env.DATABASE,
  },
  JWT: {
    publicKey: process.env.JWT_PUBLIC_KEY,
    secretKey: process.env.JWT_SECRET_KEY,
  },
  s3:{
    BUCKET:process.env.S3BUCKET,
    URL:process.env.S3URL,
    ACCESS_KEY_ID : process.env.S3ACCESSKEYID,
    SECRET_ACCESS_KEY : process.env.S3SECRETACCESSKEY,
    REGION:process.env.S3REGION,
  }
};
