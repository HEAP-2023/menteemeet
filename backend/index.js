const config = require('./utils/config');
const cors = require('cors');

//Server settings
const express = require('express');
const app = express();

//Server params
const PORT = config.PORT;
const API_VER = config.API_VER;

app.use(cors());
//For parsing application/json data
app.use(express.json());

//For parsing application/x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

//Import sequelize
const sequelize = require('./config/database');

//Seed data
const seedData = require('./utils/dbInit');

//Initialise associations
const initAssociations = require('./models/associations');

//Account routes
app.use(API_VER, require('./routes/accountRoutes'))
//User routes
app.use(API_VER + '/users', require('./routes/userRoutes'));
//Organiser routes
app.use(API_VER + '/organisers', require('./routes/organiserRoutes'));
//Programme routes
app.use(API_VER + '/programmes', require('./routes/programmeRoutes'));

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
    console.error("[ERROR] Error synchronizing models:", err);
  });

initAssociations();
seedData();