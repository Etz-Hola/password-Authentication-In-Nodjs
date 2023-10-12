const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errHandler');
const corsOptions = require('./config/corsOptions')
const PORT = process.env.Port || 4100



//buiting in  
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//STATIC ROUTES
app.use('/', express.static(path.join(__dirname, "public")));

// ROUTES 
app.use('/', require('./routes/root.js'))
app.use('/register', require("./routes/register"));
app.use('/employees', require('./routes/api/employees.js'))




app.use(logger)


app.use(cors(corsOptions));


//app.all is the route handler for all requests
app.all('/*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accept('json')) {
        res.json({error: '404 Not found' });
    }else {
        res.type('txt').send('404 Not found')
    }
})


app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})


