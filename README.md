## Support Ticket System README
1. **Overview**
This is a simple Express.js application for a support ticket system with MongoDB integration. Users can create support tickets, and the system checks if there is a recent ticket for the user within the last 30 minutes. If no recent ticket is found, a new ticket is created; otherwise, the system informs the user to wait before creating another ticket.
3. **Prerequisites**
- Node.js installed
- MongoDB Atlas account (or a local MongoDB server)
3. **Installation**
- Clone the repository:
`git clone https://github.com/sajeedreefy/Simple-API.git`
-  **Install dependencies:**
`npm install`
- Set up your MongoDB connection string in the url variable within app.js. Replace <your-username> and <your-password> with your MongoDB Atlas username and password.
- Start the application:
`node app.js`
- Access the application at `http://localhost:3000.`
