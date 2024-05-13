const express = require("express");
const { connection } = require("./Config/db");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(cors());

const fromemail = process.env.MAIL_USERNAME;
const pass = process.env.MAIL_PASSWORD;

app.get("/", (req, res) => {
  res.send("welcome Back sir...");
});

// MAIL PART

app.post("/mail", (req, res) => {
  const { name, email, phone, location, course, college } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: fromemail,
      pass: pass,
    },
  });

  let mailOptions = {
    from: {
      name: "cityeduguide",
      address: fromemail,
    },
    to: "cityeduguide@gmail.com",
    // to: "rajendrapateljobs@gmail.com",
    // to: "narendraplanedu@gmail.com",
    subject: college,
    html: `<table width='60%' style='border:1px solid black;'>
                  <th style='background-color:#0051A4;color:#FFFFFF;text-align: center;'>Description</th>
                  <th style='background-color:#0051A4;color:#FFFFFF;text-align: center;'>Value</th>
                  
                  <tr style='background-color:#AAD4FF;'>
                    <td width='65%'>Name</td>
                    <td>${name}</td>
                  </tr>
                  
                  <tr style='background-color:#AAD4FF;'>
                    <td width='65%'>Email Id</td>
                    <td>${email}</td>
                  </tr>
                  
                  <tr style='background-color:#AAD4FF;'>
                    <td width='65%'>Phone</td>
                    <td>${phone}</td> 
                  </tr>
                  
                  <tr style='background-color:#AAD4FF;'>
                    <td width='65%'>Location</td>
                    <td>${location}</td> 
                  </tr>

                  <tr style='background-color:#AAD4FF;'>
                    <td width='65%'>Course</td>
                    <td>${course}</td> 
                  </tr>
                  </table>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send({ message: error });
    } else {
      res.send({ message: info.response });
    }
  });
});

// APP LISTING START FROM HERE

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB");
    console.log(error);
  }
  console.log(`Listening at port ${process.env.port}`);
});
