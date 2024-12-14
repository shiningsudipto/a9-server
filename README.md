# ElectroHub - e-commerce

## Live URL

The backend of this project is deployed and can be accessed [here](https://electro-hub-one.vercel.app).

## Technology Stack & Packages

- **Backend Framework**: Node.js, Express.js, PostgreSQL, Prisma
- **Database**: PostgreSQL (with Prisma ORM)
- **Language**: TypeScript
- **Validation**: Zod
- **Environment Management**: Dotenv

### Key Packages

- **Prisma**: For ORM and database migrations
- **Zod**: For schema validation
- **Express**: Server and API handling
- **Typescript**: Type safety and development

### Key Features

- **Admin Management**
- **Vendor Management**
- **User Management**
- **Searching, Sorting**
- **Authentication**
- **Authorization**
- **Payment**

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone https://github.com/shiningsudipto/library-management-a8.git
   cd library-management-system
   ```
2. **Open cloned folder**:
   ```
   cd library-management-a8
   ```
3. **Open terminal to install dependencies**:
   ```
   npm install
   ```
4. **Create '.env' file at the root**:
5. **Setup environment variables**:
   ```
   DATABASE_URL
   NODE_ENV
   PORT
   JWT_SECRET
   EXPIRES_IN
   REFRESH_TOKEN_SECRET
   REFRESH_TOKEN_EXPIRES_IN
   RESET_PASS_TOKEN
   RESET_PASS_TOKEN_EXPIRES_IN
   RESET_PASS_LINK
   EMAIL
   APP_PASS
   PAYMENT_URL
   PAYMENT_VERIFY_URL
   STORE_ID
   SIGNATURE_KEY
   CLIENT_URL
   LIVE_URL
   CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET
   ```
6. **Run project**:
   ```
   npm run dev
   ```
