
# Rakshak

Introducing Rakshak, the innovative web application revolutionizing the process of obtaining a driving license. Designed to streamline and modernize the assessment procedure, Rakshak offers users a seamless experience from sign-in to certification.

With Rakshak, users can easily register and sign in to access the comprehensive assessment platform. The assessment comprises 20 carefully crafted questions, each strategically designed to evaluate the individual's knowledge and understanding of driving regulations and safety protocols.

One of Rakshak's standout features is its efficient time management system. With a time limit of 10 minutes and 30 seconds allocated per question, users are prompted to respond swiftly and accurately, simulating real-world driving scenarios and decision-making under pressure.

Furthermore, Rakshak prioritizes user convenience by enabling them to save their documents in PDF format or upload images seamlessly. This functionality ensures that users can securely store and access essential documents related to their driving license application process.

Rakshak isn't just a test-taking platform—it's a comprehensive solution that empowers individuals to obtain their driving licenses efficiently and confidently. Whether you're a new driver seeking licensure or a seasoned driver refreshing your knowledge, Rakshak is your trusted companion on the road to certification. Experience the future of driving assessment with Rakshak today.


## Setup Locally
Setting up Rakshak for development is soo, easy
# Prerequisites

Before you proceed with the setup, ensure you have the following prerequisites installed and set up:

1. **Node.js >= 18**: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is required to run JavaScript code outside of a web browser. You can download and install Node.js from the [official Node.js website](https://nodejs.org/).

2. **Yarn or npm**: Yarn and npm are package managers for JavaScript. They allow you to install and manage dependencies for your Node.js projects. While Node.js comes with npm pre-installed, you can also choose to use Yarn. You can install Yarn by following the instructions on the [Yarn installation page](https://yarnpkg.com/getting-started/install) or use npm, which comes bundled with Node.js.

3. **Cloudinary Account**: Cloudinary is a cloud-based service that provides an end-to-end image and video management solution. You'll need a Cloudinary account to manage media assets such as images and videos. You can sign up for a Cloudinary account at [Cloudinary's website](https://cloudinary.com/).

4. **MongoDB Database**: MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. You'll need a MongoDB database to persist your application's data. You can download and install MongoDB Community Server from the [official MongoDB website](https://www.mongodb.com/try/download/community) or use a managed MongoDB service like MongoDB Atlas.

Ensure that you have all these prerequisites set up and configured correctly before proceeding with the setup of your application.

# Environment Variables Configuration

To configure your application's environment variables, create a `.env` file in the root directory of your project. This file will contain sensitive information and configuration settings that your application needs to run but should not be hard-coded into your codebase. Follow the template below to set up your `.env` file:

```
# MongoDB Configuration
MONGODB_URI=your_mongodb_uri

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
# Session Secret
SESSION_SECRET=your_session_secret

# JWT Secret
JWT_SECRET=your_jwt_secret

# Application Port (Optional)
PORT=3000
```

Replace the placeholders (`your_mongodb_uri`, `your_cloudinary_cloud_name`, `your_cloudinary_api_key`, and `your_cloudinary_api_secret`) with your actual MongoDB connection URI, Cloudinary cloud name, API key, and API secret respectively.

- `MONGODB_URI`: This is the URI used by your application to connect to your MongoDB database. It typically follows the format `mongodb://username:password@host:port/database`.

- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary account's cloud name, which identifies your account and is used in API requests.

- `CLOUDINARY_API_KEY`: Your Cloudinary account's API key, which is used to authenticate API requests.

- `CLOUDINARY_API_SECRET`: Your Cloudinary account's API secret, used to sign API requests for enhanced security.

- `PORT`: (Optional) The port on which your application will run. If not specified, the default port `3000` will be used.

- `SESSION_SECRET`: This is a secret key used to sign the session ID cookie. It's used to encrypt the session data before storing it in the cookie.

- `JWT_SECRET`: This is a secret key used to sign JSON Web Tokens (JWTs) issued by your application. It's used to verify the authenticity of the tokens and prevent tampering.

**Note:** Remember to load the environment variables from the `.env` file into your Node.js application using a library like `dotenv` (`require('dotenv').config()`). This will make the environment variables accessible within your application's code.

Below is the Markdown file (`env_variables.md`) containing the environment variable documentation for a web application located in the `/web` folder, with the environment variable named `VITE_API_SERVER_URL`:

```markdown
# Environment Variables Configuration for Web Application

To configure your web application's environment variables, create a `.env` file in the root directory of your `/web` folder. This file will contain sensitive information and configuration settings that your web application needs to run but should not be hard-coded into your codebase. Follow the template below to set up your `.env` file:

```
VITE_API_SERVER_URL=your_api_server_url
```

Replace `your_api_server_url` with the URL of your API server.

- `VITE_API_SERVER_URL`: This is the URL of your API server that your web application will communicate with. Make sure to provide the full URL, including the protocol (e.g., `http://` or `https://`).

Ensure that you do not share your `.env` file publicly or include it in your version control system (e.g., Git). Add it to your `.gitignore` file to prevent accidental commits.

**Note:** If you are using Vite.js for your web application, the environment variables prefixed with `VITE_` will be automatically available in your codebase during development and build processes. Ensure that you access these variables using `import.meta.env` in your Vite project.

```
// Example Usage in Vite.js
const apiUrl = import.meta.env.VITE_API_SERVER_URL;
```

Remember to replace `VITE_API_SERVER_URL` with the actual environment variable name you defined in your `.env` file.

``` 

This Markdown file provides guidance on setting up the `VITE_API_SERVER_URL` environment variable for your web application in the `/web` folder and includes usage instructions if you're using Vite.js.

# Project Setup Guide

This guide provides step-by-step instructions to set up and run your project. The project consists of a server located in the root folder and a web application located in the `./web` directory, which runs on port 3000.

## Server Setup

1. **Clone the Repository**: Clone the project repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the Server Directory**: Change your current directory to the root folder of the project:

    ```bash
    cd <project-directory>
    ```

3. **Install Dependencies**: Install the server dependencies using Yarn:

    ```bash
    yarn install
    ```

4. **Set Environment Variables**: Create a `.env` file in the root directory and configure the following environment variables:

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    SESSION_SECRET=your_session_secret
    JWT_SECRET=your_jwt_secret
    ```

5. **Run the Server**: Start the server:

    ```bash
    yarn run dev
    ```

    Your server should now be running on the default port.

## Web Application Setup

1. **Navigate to the Web Directory**: Change your current directory to the `./web` directory:

    ```bash
    cd web
    ```

2. **Install Dependencies**: Install the web application dependencies using Yarn:

    ```bash
    yarn install
    ```

3. **Set Environment Variables**: Create a `.env` file in the `./web` directory and configure the following environment variable:

    ```plaintext
    VITE_API_SERVER_URL=http://localhost:3000
    ```

4. **Run the Web Application**: Start the web application:

    ```bash
    yarn dev
    ```

    Your web application should now be running on port 3000.

## Accessing the Application

You can now access your application by navigating to `http://localhost:3000` in your web browser.