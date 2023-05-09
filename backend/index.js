const express = require('express');
const { connect } = require('./Configs/db');
var cors = require('cors');
const { Router } = require('./Routes/server.routes');
require('dotenv').config()
const app = express();
app.use(cors())
app.use(express.json());
app.use("/", Router)
app.listen(process.env.PORT, connect());
