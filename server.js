// ========================================
// SOCIAL MEDIA CHATBOT SERVER (RULE BASED)
// EDITABLE + MOBILE FRIENDLY
// ========================================

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

// ========================================
// EDIT YOUR CHATBOT RULES HERE
// ========================================

const rules = [

  {
    keywords: ["price", "cost", "how much"],
    reply:
      "Our chatbot setup starts at $99.\n\nIt includes:\n• Lead capture\n• Auto replies\n• Booking integration\n\nWould you like a demo?"
  },

  {
    keywords: ["demo", "example", "show"],
    reply:
      "Yes! Try our live demo here:\nhttps://your-demo-link.com\n\nOr type 'start' to test now."
  },

  {
    keywords: ["start", "hello", "hi"],
    reply:
      "Hi! 👋 I'm the AI assistant.\n\nI can help you:\n• Capture leads\n• Answer customers\n• Book appointments\n\nType 'demo' or 'price'."
  },

  {
    keywords: ["book", "appointment"],
    reply:
      "You can book here:\nhttps://calendly.com/your-link\n\nOr type your email and we'll contact you."
  },

  {
    keywords: ["contact", "email"],
    reply:
      "Please type your email and our team will contact you within 24 hours."
  }

];

// Default reply
const defaultReply =
  "Thanks for your message! 👋\n\nType:\n• demo\n• price\n• book\n\nand I'll help you.";


// ========================================
// RULE ENGINE
// ========================================

function getReply(message) {

  const msg = message.toLowerCase();

  for (let rule of rules) {

    for (let keyword of rule.keywords) {

      if (msg.includes(keyword)) {
        return rule.reply;
      }

    }

  }

  return defaultReply;

}


// ========================================
// WEBSITE CHAT ENDPOINT
// ========================================

app.post("/chat", (req, res) => {

  const userMessage = req.body.message || "";

  const reply = getReply(userMessage);

  res.json({
    reply: reply
  });

});


// ========================================
// INSTAGRAM / FACEBOOK WEBHOOK VERIFY
// ========================================

app.get("/webhook", (req, res) => {

  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }

});


// ========================================
// INSTAGRAM / FACEBOOK RECEIVE MESSAGE
// ========================================

app.post("/webhook", (req, res) => {

  console.log("Message received:", JSON.stringify(req.body, null, 2));

  // You can connect auto-reply here later

  res.sendStatus(200);

});


// ========================================
// HEALTH CHECK
// ========================================

app.get("/", (req, res) => {

  res.send("Chatbot server running ✅");

});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {

  console.log("Server running on port " + PORT);

});

