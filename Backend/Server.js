const express = require('express')
const app = express();
const loginRoutes = require('./Routes/LoginRoutes');
const dashRoutes = require('./Routes/DashBoardRoutes')
const cookieParser = require('cookie-parser');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
const cors = require("cors");
/* require("./dbConnect"); */
const PORT = 5000;
/* require("./redisConnect") */
const sequelize = require("./dbConnect");
const User = require("./models/User");
app.use(cookieParser());
app.use(express.json());
/* app.use(xss()); */
app.use(xss());

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization","x-xsrf-token"], // Allowed headers
  })
);
/* const authRoutes = require("./Middlewear/Auth") */


const startServer = async () => {
  try {
    await sequelize.sync();  // 👈 No { alter: true }
    console.log("✅ User table synced with MariaDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Sync error:", error);
  }
};

startServer();

  

/* 
  app.post("/dataChecking", async () =>{

  }) */

   /*  app.post("/auth", async (req, res) => {
        try {
          const { username, name, password } = req.body;
          console.log(req.body); 
      
        
          const existingUser = await User.findOne({ where: { username } });
          if (existingUser) {
            return res.status(400).json({ error: "username already in use" });
          }
      
          const user = await User.create({ username, name, password });
          res.status(201).json({ message: "User registered successfully!", user });
        } catch (error) {
          console.error("❌ Registration error:", error); 
          res.status(500).json({ error: error.message }); 
        }
      }); */

      app.get("/dataGet", async (req,resp) => {
        const response = await User.findOne({where:{username:"sonihardik2001@gmail.com"} })
      resp.status(200).json(response);
      })
      





app.use('/user', loginRoutes);
app.use('/userData', dashRoutes)






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})