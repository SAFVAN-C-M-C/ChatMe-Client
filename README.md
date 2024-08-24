# ChatMe Frontend

Welcome to the frontend repository of **ChatMe**, a social media platform with a small job portal feature. This project is built using the MERN stack and provides functionalities like real-time chat, job searching, posting, and interactions with posts.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)


## Project Overview

**ChatMe** is designed to be a social media platform where users can interact in real time, create posts, and participate in conversations. In addition, it includes a job portal feature where users can search for jobs and recruiters can post job opportunities. This frontend repository handles the user interface and interactions, connecting with the backend microservices.

## Features

- **Real-time Chat:** Engage in conversations with other users instantly using WebSockets.
- **Post Creation and Interaction:** Users can create posts, comment, like, and share posts.
- **Job Search:** Users can browse through job listings and apply directly.
- **Job Posting:** Recruiters can create job postings for others to see and apply.
- **User Authentication:** Secure login and registration system.
- **Responsive Design:** Mobile-friendly interface for an optimal user experience.

## Tech Stack

- **React**: For building user interfaces.
- **TypeScript**: For type-safe development.
- **Redux**: For state management.
- **Tailwind CSS**: For styling the components.
- **Socket.io**: For enabling real-time chat features.
- **Axios**: For making HTTP requests.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/chatme-frontend.git
    cd chatme-frontend
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and provide the necessary environment variables (replace placeholders with actual values):

    ```bash
    REACT_APP_API_URL=<backend_api_url>
    REACT_APP_SOCKET_URL=<socket_server_url>
    ```

4. **Start the Development Server:**
    ```bash
    npm start
    ```

5. **Build for Production:**
    ```bash
    npm run build
    ```



