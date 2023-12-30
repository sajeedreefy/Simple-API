const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 
const app = express();
const port = 3000;
const url = "mongodb+srv://sajeedreefy:6rMjEYTjLNMnOcLy@cluster0.k0lplkf.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(url);
const SupportTicket = mongoose.model('SupportTicket2', {
  userID: String,
  date: Date,
  deviceID: String,
  queryText: String,
});
 

app.use(bodyParser.json());
app.get("/", async (req, res) => {
  return res.send("WORKING");
})

// Method: POST
app.post('/support/create_ticket', async (req, res) => {
    const { userID, date, deviceID, queryText } = req.body;
  
    try {
      // Check if there is a recent ticket for the user
      const lastTicket = await SupportTicket.findOne({ userID }).sort({ date: -1 });
  
      if (!lastTicket || Date.now() - lastTicket.date.getTime() > 30 * 60 * 1000) {
        // Case 1: Save the record in DB
        const newTicket = new SupportTicket({ userID, date, deviceID, queryText });
        await newTicket.save();
  
        // Send success response
        res.status(200).json({ data: { _id: newTicket._id } });
      } else {
        // Case 2: Last request was less than or equal to 30 minutes ago
        const timeRemaining = 30 - Math.floor((Date.now() - lastTicket.date.getTime()) / (60 * 1000));
  
        // console.log(`User ${userID} already placed a support ticket. Time remaining: ${timeRemaining} minutes.`);
  
        res.status(409).json({
          message: `You have already placed a support ticket. Please wait at least ${timeRemaining} minute(s) before sending another request.`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
