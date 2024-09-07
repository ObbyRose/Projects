# Project Name

## Prerequisites

- Node.js and npm must be installed on your system. [Download Node.js](https://nodejs.org/).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/israelTechCa/SQL_NODE.git
   cd SQL_NODE
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root:

   ```bash
   DB_USER=yourUsername
   DB_PASSWORD=yourPassword
   DB_SERVER=yourServer
   DB_DATABASE=yourDatabaseName
   ```

4. **Start the server:**

   ```bash
   node server.js
   ```

## Usage

- The server will be running at `http://localhost:3000`.
- Access the data at `http://localhost:3000/data`.

## Pulling and Installing from Git

To pull the latest changes from the Git repository and install any new dependencies:

```bash
# Pull the latest changes from the repository
git pull origin main

# Install any new dependencies
npm install
