const express = require('express');
const apiControllers = require("./Controllers/apiController")
const htmlControllers = require("./Controllers/htmlControllers")
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiControllers)
app.use('/', htmlControllers)

app.listen(PORT, () => {
    console.log('listening on port' + PORT);
});