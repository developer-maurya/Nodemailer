import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chitranjan75075@gmail.com",
      pass: "dibiebobcdvcavbe"
    }
  });

  let mailOptions = {
    from: email,
    to: "chitranjan75075@gmail.com",
    subject: "New Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ msg: "Email sent" });
  } catch (err) {
    res.send({ msg: "Error" });
  }
});

app.listen(5000, () => console.log("Server running"));