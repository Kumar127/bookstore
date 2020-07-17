if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express =  require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

const bodyParser = require('body-parser');


app.set('view engine', 'ejs'); // set the view engine i.e EJS in our case
app.set('views', __dirname + '/views'); //set view to the cuurent directory views folder
app.set('layout', 'layouts/layout'); // set the layout to the particular folder
app.use(expressLayouts) // to keep the basic layout in html for e.g Header,footer
app.use(express.static('public')) // Keeps the style sheet file & javascripts file
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open', () => console.log('connected to mongoose'))

app.use('/',indexRouter)
app.use('/authors',authorRouter);

app.listen(process.env.PORT || 3000,() => console.log(`server running at the port 3000`))