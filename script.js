const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

// 👇 app define karna jaruri hai
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.send("Server chal raha hai ✅");
});

// email route
app.post("/send-email", async (req, res) => {
  const { name, email, service, message } = req.body;

  console.log("DATA RECEIVED 👉", req.body);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "chitranjan75075@gmail.com",
        pass: "uoebknxwzfqgsozt", // 👈 yaha apna app password daalo
      },
    });

    await transporter.sendMail({
      from: "chitranjan75075@gmail.com",
      to: "chitranjan75075@gmail.com",
      subject: "New Contact Form Message",
      html: `
        <h2>New Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.send("Email Sent Successfully ✅");
  } catch (error) {
    console.log("SERVER ERROR 👉", error);
    res.status(500).send("Error sending email ❌");
  }
});

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});


