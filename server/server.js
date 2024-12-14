const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3333;

app.use(bodyParser.json());

// Enable CORS for a specific origin
const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const messages = [{ id: 1, text: "Let's start messaging!" }];

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  setTimeout(() => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Message text is required" });
    }

    const newMessage = {
      id: messages.length + (Math.random() * 10).toFixed(0),
      text,
    };

    messages.push(newMessage);

    res.status(201).json(newMessage);
  }, 2000);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
