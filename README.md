<h1 align="center" id="title">Whisper Pal</h1>

<p id="description">Introducing Whisper Pal, the chat app with zero notifications—because sometimes, silence is golden! Built with the MERN stack, it lets you log in, register, and set avatars without any pinging interruptions. Real-time messaging is powered by Socket.io and MongoDB, ensuring your whispers are heard instantly. Developed over a weekend, Whisper Pal proves that you can have a great chat without the constant buzz.</p>

## Installation Steps

1. **Connect to Database:**
   - **Check for Database Path:**
     - Ensure you have a `/data/db` path. If it doesn't exist, create it using:
       ```bash
       mkdir -p /data/db
       ```
     - Ensure the directory has the correct permissions:
       ```bash
       sudo chown -R `id -u` /data/db
       ```
   - **Specify a Different Data Directory (Optional):**
     - If you prefer a different path, specify it with the `--dbpath` option when starting MongoDB:
       ```bash
       mongod --dbpath /path/to/your/directory
       ```
     - Update the MongoDB configuration file (`mongod.conf`) to set the `storage.dbPath`:
       ```yaml
       storage:
         dbPath: /path/to/your/directory
       ```

2. **Start the Server:**
   - Navigate to the server directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Start the Client:**
   - Navigate to the public directory:
     ```bash
     cd public
     ```
   - Start the client (React app):
     ```bash
     npm start
     ```
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   React.js
*   Node.js and Express.js
*   Socet.io
*   MongoDB

<h2>🛡️ License:</h2>

This project is licensed under the MIT
