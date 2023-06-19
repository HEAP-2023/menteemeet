require('dotenv').config({ path: './.env' });

//Server settings
const express = require('express');
const app = express();

//Server params
const PORT = process.env.PORT;
const API_VER = process.env.API_VER;

//Import sequelize
const sequelize = require('./config/database');

//JSON
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
      app.listen(PORT, () => {
          console.log(`Connected to DB, server is listening on port ${PORT}`);
      })
  })
  .catch((err) => {
      console.error("Error: unable to connect to DB");
  })

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("[SYSTEM] All models synchronized successfully!");
  })
  .catch((err) => {
    console.error("[ERROR ] Error synchronizing models:", err);
  });