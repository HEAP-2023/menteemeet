require('dotenv').config({ path: './.env' });

//Server settings
const express = require('express');
const app = express();

//Server params
const PORT = process.env.PORT;
const API_VER = process.env.API_VER;

//JSON
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})