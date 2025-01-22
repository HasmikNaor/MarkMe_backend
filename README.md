# Project Setup Instructions

## Step 1: Install Dependencies and Start the Development Server

1. Open a terminal and navigate to the project directory.
2. Run the following commands:
   ```bash
   npm install
   npm run dev
   ```

## Step 2: Configure ngrok

ngrok is required to enable the Telegram server to communicate with your local development environment. Follow these steps to set up ngrok:

### a. Download ngrok

1. Visit the [ngrok website](https://ngrok.com/).
2. Sign up for an account.

### b. Copy the ngrok Auth Token

1. After signing up, log in to your ngrok account.
2. Copy the authentication token provided by ngrok.

### c. Configure ngrok with the Auth Token

1. Open a terminal and navigate to the directory where ngrok was downloaded.
2. Run the following command to authenticate ngrok:

   ```bash
   ./ngrok authtoken <your-token>
   ```

   Replace `<your-token>` with the token you copied.

   If you encounter a `command not found` error, use the full path to the ngrok binary, for example:

   ```bash
   ~/Documents/Downloads/ngrok authtoken <your-token>
   ```

3. You should see a message confirming that the Auth Token was saved: `Authtoken saved to configuration file`.

### d. Connect ngrok to Your Localhost

1. Run ngrok to expose your localhost port (e.g., 4040):

   ```bash
   ~/Documents/Downloads/ngrok http 4040
   ```

2. Copy the generated public URL provided by ngrok.

### e. Update the `.env` File

1. Open the `.env` file in your project directory.
2. Set the `SERVER_URL` variable to the ngrok public URL you copied. For example:

   ```env
   SERVER_URL=https://<your-ngrok-subdomain>.ngrok.io
   ```

   ## Starting a Conversation with the Bot

To start the conversation with the bot, ensure that you have completed the previous steps and the backend is running successfully. Then, follow these steps::

1. Go to your Telegram app.
2. Search for `@mark_me_assignment_bot` and start sending messages.

Now your environment is ready, and the Telegram server can communicate with your application running on localhost.
