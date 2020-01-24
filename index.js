const express = require('express');
const path = require('path');
const morgan = require('morgan');
const apiRouter = require('./routes/api.routes');
const config = require('./configs');
const cors = require('cors');

//setup
const app = express();
app.set('port', process.env.PORT || config.PORT);

//allow request from everywhere
// app.use(cors({origin:['http://localhost:4000'],credentials: true}));
app.use(cors());

//using inbuilt middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// third party middleware for logging
app.use(morgan('dev'));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

const logger = (req, res, next) => {
	switch (req.method) {
		case 'GET':
			next();
			break;
		case 'POST':
			next();
			break;
		case 'PUT':
			next();
			break;
		case 'PATCH':
			next();
			break;
		case 'DELETE':
			next();
			break;
		default:
			next('Invalid request method');
	}
};

//route to API router
app.use('/app', logger, apiRouter);

//when route doesnt exist
app.use(function(req, res, next) {
	next({
		status: 404,
		msg: 'Resource not found.'
	});
});

//error handling middleware
app.use(({ err, msg, status }, req, res, next) => {
	res.status(status || 400).json({
		msg: msg || 'Stopped at error handling middleware',
		err
	});
	res.end();
});

app.listen(app.get('port'), () => {
	console.log('Listening on port', app.get('port'));
});
