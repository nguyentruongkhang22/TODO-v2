// DEPENDENCIES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routers/route');

dotenv.config({ path: './config.env' });
const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// MIDDLEWARES
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        // useCreateIndex: true,
    })
    .then(() => console.log('DB CONNECTED!'))
    .catch((err) => {
        console.log(err);
    });

// ROUTING
app.use('/', router);

// SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
