# Event Management - opskube

This is a full-stack application with a React frontend and a Node.js backend. Below are the instructions to set up both the client and server parts of the project.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Client Setup](#client-setup)
   - [Installing Dependencies](#installing-dependencies)
   - [Running the React App](#running-the-react-app)
3. [Server Setup](#server-setup)
   - [Installing Dependencies](#installing-dependencies-server)
   - [Running the Node.js Server](#running-the-nodejs-server)
4. [Connecting Client & Server](#connecting-client-server)
5. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

---

## Prerequisites

Before you start, make sure you have the following installed on your machine:

- **Node.js** (including `npm` or `yarn`) - [Download Node.js](https://nodejs.org/)
- **Git** (optional, but useful for cloning the repository) - [Download Git](https://git-scm.com/)
- **Text editor** (e.g., VS Code) for editing the code.

Make sure you also have access to the terminal (e.g., Command Prompt, PowerShell, or a terminal in your IDE).

---

## Client Setup

The client is a React application.

### Installing Dependencies

Navigate to the `client` folder (or wherever your React project is located):

```bash
cd client 


Then, install the dependencies by running:

```
Copy
npm install
# or if you're using yarn:

```
yarn install

```
This will install all the necessary packages defined in the package.json file.

Running the React App
Once the dependencies are installed, you can start the React development server:

```
npm start

```

# or if you're using yarn:

```
yarn start

```
This should automatically open the React app in your browser at http://localhost:3000.

Server Setup

The server is a Node.js application, typically using Express.

Installing Dependencies
Navigate to the server folder (or wherever your Node.js project is located):

```
cd server
```
Then, install the dependencies:

```
npm install

```
# or if you're using yarn:

```
yarn install

```
This will install all the necessary packages for the server-side, which are defined in the package.json file.

Running the Node.js Server
Once the dependencies are installed, you can start the Node.js server:

```
npm start

```
# or if you're using yarn:
```
yarn start
```
By default, this will start the server on http://localhost:5080 (you can change this in the server code if needed).
