# Steps

1. Create tables users, images and image_logs

## MYSQL Database

```sql
CREATE TABLE `users` (
 `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
 `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
 `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
 `email` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
 `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
 `is_deleted` int(11) NOT NULL DEFAULT 0,
 `creation_datetime` timestamp NOT NULL DEFAULT current_timestamp(),
 `updation_datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`id`)
);
```

```sql
CREATE TABLE `images` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
 `creation_datetime` timestamp NOT NULL DEFAULT current_timestamp(),
 PRIMARY KEY (`id`)
);
```

```sql
CREATE TABLE `image_logs` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `image_id` bigint(20) NOT NULL,
 `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
 `creation_datetime` timestamp NOT NULL DEFAULT current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `image_id` (`image_id`),
 KEY `user_id` (`user_id`),
 CONSTRAINT `image_logs_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`),
 CONSTRAINT `image_logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);
```
2. Setup environment variables

Create .env file in the root directory and add following
```bash
HOST=<HOST of Mysql>
USER=<User name of Mysql>
PASSWORD=<Password of Mysql>
MYSQLPORT=<Port for Mysql>
CONNECTION_LIMIT=<Connection Limit for Mysql pool>
DATABASE=<Database name of Mysql>
PORT=<Port of server>
JWT_SECRET_KEY=<Secret Key of JWT>
S3URL=<S3 URL of folder where to store images>
S3BUCKET=<S3 bucket name>
S3ACCESSKEYID=<S3 access key id>
S3SECRETACCESSKEY=<S3 secred access key>
S3REGION=<S3 region>
```

3. Install node modules
```bash
npm install
```

4. Run server
```bash
node app.js
```
