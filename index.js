const express = require('express');
const path = require('path');
const morgan = require('morgan');
const apiRouter = require('./routes/api.routes');
const config = require('./configs');
const cors = require('cors');

//setup
const app = express();
app.set('port', process.env.PORT || config.PORT);

//using inbuilt middleware to parse incoming data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// third party middleware for logging
app.use(morgan('dev'));

//allow request from everywhere
app.use(cors());

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
		case 'DELETE':
			next();
			break;
		default:
			next('Invalid request method');
	}
};

//route to API router
app.use('/api', logger, apiRouter);

//when route doesnt exist
app.use(function(req, res, next) {
	next({
		status: 404,
		msg: 'Not Found'
	});
});

//error handling middleware
app.use(({ err, msg }, req, res, next) => {
	res.status(400).json({
		msg: msg || 'Stopped at error handling middleware',
		err
	});
	res.end();
});

app.listen(app.get('port'), () => {
	console.log('Listening on port', app.get('port'));
});
