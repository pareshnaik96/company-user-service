# Company & User Management API

## Overview
This project provides REST APIs for managing companies and users, supporting hierarchical company structures and optimized search queries using MongoDB aggregation.

## Tech Stack
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Search Optimization:** MongoDB Aggregation Pipelines
- **Environment Management:** dotenv

## Features
- **Company Management:** Create and retrieve companies with hierarchical support.
- **User Management:** Register users under specific companies.
- **Search API:** Search for users or companies by name or email.
- **Efficient Querying:** Optimized search using indexes and aggregation pipelines.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/pareshnaik96/company-user-service.git
   cd company-user-service
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add MongoDB connection string:
   ```env
   DB_URL=mongodb+srv://pareshnaik:W536yetBeRCk0yL8@cluster0.m9yz9.mongodb.net/company-user-service
   PORT=3000
   ```
4. Start the server:
   ```sh
   npm start
   ```
## Run in Development Mode
```sh
npm run dev
```

## API Endpoints

### Company APIs
#### **Create a Company**
- **Endpoint:** `POST /companies`
- **Request Body:**
  ```json
  {
    "name": "TechCorp",
    "parentCompanyId": "65b9dffc5dc0e00384d440d0" // (optional)
  }
  ```
- **Response:**
  ```json
  {
    "status": true,
    "message": "Company Registered successfully",
    "data": {
      "companyId": "65b9dffc5dc0e00384d440d1",
      "hierarchyLevel": 2
    }
  }
  ```

#### **Get Company Details**
- **Endpoint:** `GET /companies/:companyId`
- **Response:**
  ```json
  {
    "_id": "65b9dffc5dc0e00384d440d1",
    "name": "TechCorp",
    "parentCompanyId": "65b9dffc5dc0e00384d440d0",
    "users": [...],
    "subCompanies": [...]
  }
  ```

### User APIs
#### **Register a User**
- **Endpoint:** `POST /users`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "companyId": "65b9dffc5dc0e00384d440d1"
  }
  ```
- **Response:**
  ```json
  {
    "status": true,
    "message": "User Registered successfully",
    "data": {
      "userId": "65b9e1235dc0e00384d440d2",
      "companyId": "65b9dffc5dc0e00384d440d1",
      "role": "user"
    }
  }
  ```

#### **Get User Details**
- **Endpoint:** `GET /users/:userId`
- **Response:**
  ```json
  {
    "_id": "65b9e1235dc0e00384d440d2",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "companyId": {
      "_id": "65b9dffc5dc0e00384d440d1",
      "name": "TechCorp"
    }
  }
  ```

### Search API
#### **Search for Users or Companies**
- **Endpoint:** `GET /search?query=<search-term>`
- **Response:**
  ```json
  {
    "status": true,
    "data": {
      "users": [...],
      "companies": [...]
    }
  }
  ```



