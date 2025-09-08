# AI-Powered Course Management App

Welcome to the AI-Powered Course Management App! This is a full-stack web application that allows users to manage a list of educational courses. You can add, edit, view, and delete courses.

The standout feature is its integration with Google's Gemini AI, which can automatically generate professional and engaging descriptions for your courses with the click of a button.



## Features

- **Full Course Management (CRUD):**
    - **Create:** Add new courses with details like title, instructor, and duration.
    - **Read:** View a clean, modern dashboard of all available courses.
    - **Update:** Easily edit the details of any existing course.
    - **Delete:** Remove courses you no longer need.
- **AI-Powered Description Generation:** Automatically create high-quality course descriptions using the course title and instructor's name.
- **Modern & Responsive UI:** A clean, user-friendly interface that works well on both desktop and mobile devices.
- **Modal-based Forms:** A pop-up form for adding and editing courses keeps the main dashboard tidy.

## Tech Stack

- **Frontend:** React, TypeScript, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose and the Atlas cloud service)
- **AI Integration:** Google Gemini API

---

## Getting Started: The Complete Guide

This guide will walk you through every step to get this project running on your local computer. Even if you're not a developer, you can follow these instructions.

### Prerequisites

Before you start, you need to have two things installed on your computer:
1.  **Git:** A tool for downloading the project code. [How to install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
2.  **Node.js:** The environment that runs the application. [Download and install Node.js here](https://nodejs.org/en).

### Step 1: Get the Project Code

First, you need to download the project files from GitHub. Open your terminal or command prompt and run this command:

```bash
git clone <your-repository-url>
cd course-manager-ai
```

This will create a `course-manager-ai` folder on your computer and take you inside it.

-----

### Step 2: Set Up the Backend (The Server)

The backend is the engine of our application. It handles storing data and talking to the AI. This part requires a couple of secret keys to work.

**A. Navigate to the Server Folder:**

```bash
cd server
```

### B. Install the Dependencies
This command downloads all the necessary **code libraries** for the server. 💻

```bash
npm install
```

### C. Get Your Secret Keys (API Keys)
Our application needs to connect to a database and the Google AI service. To do this securely, we need two **secret keys**. 🔑

#### Get the MongoDB URI (your database key)
* Go to the **[MongoDB Atlas website](https://www.mongodb.com/cloud/atlas)** and sign up for a free account.
* Create a new project and a new **free `M0` cluster**.
* In your cluster, go to **Database Access** and create a **new database user**. *Write down the username and password you choose.*
* Next, go to **Network Access** and click "**Add IP Address**". Select "**Allow Access from Anywhere**" (`0.0.0.0/0`).
* Finally, go back to your cluster's main page, click "**Connect**", and select "**Drivers**".
* You will see a **Connection String**. Copy this string. It will be your `MONGO_URI`.

#### Get the Gemini API Key (your AI key)
* Go to the **[Google AI Studio website](https://aistudio.google.com/app/apikey)**.
* Log in with your Google Account and click "**Create API key**".
* Copy the generated key. This will be your `GEMINI_API_KEY`.

### D. Create the .env file
This is a special file to store your **secret keys**.

* Inside the `server` folder, create a new file and name it `.env`.
* Open this file and paste the following content. Replace the placeholders with the keys you just copied.

```env
# server/.env file

# MongoDB Connection String - Replace with your key from MongoDB Atlas
MONGO_URI=mongodb+srv://your_username:your_password@yourcluster.mongodb.net/yourDatabaseName?retryWrites=true&w=majority

# Google Gemini API Key - Replace with your key from Google AI Studio
GEMINI_API_KEY=YourGeneratedApiKeyFromGoogleAIStudio
```

### E. Run the Server
Now, start the **backend server** by running this command in your terminal (make sure you are still in the `server` folder).

```bash
node server.js
```
You should see "MongoDB connected successfully" and "Server is running on port 5001".
**Leave this terminal window open!** The server needs to keep running.

***

## Step 3: Set Up and Run the Frontend (The Website)

The **frontend** is the visual part of the application that you see and interact with in your browser.



### A. Open a New Terminal

This is important. Do not close your server terminal. Open a **completely new terminal window** or tab.

### B. Navigate to the Client Folder

In the new terminal, go back to the project's root folder and then into the `client` folder.

```bash
cd path/to/your/course-manager-ai/client
```

### C. Install the Dependencies
This downloads all the necessary **code libraries** for the website interface. 💻

```bash
npm install
```

### D. Run the Frontend
This command will start the application and automatically open it in your **web browser**. 🚀

```bash
npm start
```

## You're All Set! 🎉
Your **web browser** should now be open at `http://localhost:3000`, showing the AI-Powered Course Management App. You can now add, edit, and delete courses, and use the AI generation feature.


***
## License
This project is licensed under the **MIT License**.