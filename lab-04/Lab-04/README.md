# Lab 4: Registration, Login and JWT Authentication

## Student Details

- **Name:** Mahalaxmi Vennela
- **Registration Number:** 252U1R1257
- **Section:** CSE-2E
- **Subject:** Backend Development Fundamentals
- **Faculty:** Yugendhar

---

## Objective

To implement user registration and login functionality using Express.js, SQLite, bcrypt password hashing, and JWT authentication. This experiment demonstrates secure password storage and token generation after successful login.

## Technologies Used

- Node.js
- Express.js
- SQLite
- bcrypt
- jsonwebtoken
- Postman
- JavaScript

## Project Structure

```text
Lab-04/
│
├── database/
│   ├── db.js
│   ├── init-db.js
│   └── users.db
│
├── screenshots/
│   ├── register-success.png
│   ├── register-duplicate.png
│   ├── register-invalid.png
│   ├── login-success.png
│   ├── login-wrong-password.png
│   ├── login-invalid-user.png
│   ├── login-missing-fields.png
│   ├── database-users.png
│   └── jwt-decoded.png
│
├── server.js
├── view-users.js
├── verify-token.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize the Database

```bash
npm run init-db
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Server URL

http://localhost:3000/

## Environment Variables

The JWT secret can be configured using an environment variable:

```env
JWT_SECRET=your_private_secret_value
```

The local lab uses a demonstration secret if `JWT_SECRET` is not configured. A private secret should be used for deployment and must never be committed to GitHub.

## Database Design

The SQLite database contains a `users` table with the following columns:

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| username | TEXT | Unique username |
| name | TEXT | User's name |
| password | TEXT | Bcrypt-hashed password |

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check server status |
| POST | `/register/` | Register a new user |
| POST | `/login/` | Authenticate user and generate JWT |

## User Registration

The registration API accepts username, name, and password.

- Checks whether all required fields are provided.
- Checks for an existing username.
- Hashes the password using `bcrypt.hash()`.
- Stores the user details in SQLite.

### Successful Registration

![Register Success](screenshots/register-success.png)

### Duplicate Username

![Duplicate Registration](screenshots/register-duplicate.png)

### Invalid Registration

![Invalid Registration](screenshots/register-invalid.png)

## User Login

The login API accepts username and password.

- Checks whether the username exists.
- Compares the entered password with the stored hash using `bcrypt.compare()`.
- Generates a JWT token after successful authentication.

### Successful Login

![Login Success](screenshots/login-success.png)

### Wrong Password

![Wrong Password](screenshots/login-wrong-password.png)

### Invalid Username

![Invalid Username](screenshots/login-invalid-user.png)

### Missing Fields

![Missing Fields](screenshots/login-missing-fields.png)

## Database Verification

The database was verified using a JavaScript script to display the registered users.

Passwords are stored as bcrypt hashes instead of plain-text passwords.

![Database Users](screenshots/database-users.png)

## JWT Token Generation and Verification

After successful login, a JWT token is generated using `jwt.sign()`.

The token payload contains the username. The token was decoded and inspected using JWT.io.

![JWT Decoded](screenshots/jwt-decoded.png)

## Security Features

- Passwords are hashed using bcrypt.
- Plain-text passwords are not stored in the database.
- JWT payload contains only the username.
- Parameterized SQL queries are used to prevent SQL injection.
- JWT secret values should be kept private.

## Problems Faced and Solutions

1. Configured the SQLite database connection.
2. Created and initialized the users table.
3. Implemented password hashing using bcrypt.
4. Handled duplicate username registration.
5. Implemented login validation.
6. Generated JWT authentication tokens.
7. Tested successful and unsuccessful API requests using Postman.
8. Verified the stored password hashes and decoded JWT tokens.

## Conclusion

Successfully implemented user registration and login functionality using Node.js and Express.js. Passwords were securely hashed using bcrypt, and JWT tokens were generated after successful authentication. The APIs were tested using Postman, and the database records were verified using SQLite.