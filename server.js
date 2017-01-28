var app = require('express')(),
	MongoClient = require('mongodb').MongoClient,
	bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	res.send('Server working, available routes:<br>1. GET /course/:type<br>2. POST /student<br>3. POST /data');
});

app.get('/course/:type', function (req, res) {
	MongoClient.connect(process.env.MONGO_URL, function (err, db) {
		if (!err) {
			db.collection('Course').find({type: req.params['type']}).toArray(function (err, docs) {
				if (!err) {
					res.send(docs);
				} else {
					res.send({error: err});
				}
				db.close();
			});	
		} else {
			res.send({error: err});
			db.close();
		}
	});
});

app.post('/student', function  (req, res) {
	MongoClient.connect(process.env.MONGO_URL, function (err, db) {
		if (!err) {
			db.collection('Student').insertOne(req.body, function (err) {
				if (!err) {
					res.send({message: 'Inserted Successfully.'});
				} else {
					res.send({error: err});
				}
				db.close();
			});
		} else {
			res.send({error: err});
			db.close();
		}
	});
});

app.post('/data', function (req, res) {
	MongoClient.connect(process.env.MONGO_URL, function (err, db) {
		if (!err) {
			db.collection('Course').insertOne(req.body, function (err) {
				if (!err) {
					res.send({message: 'Inserted Successfully.'});
				} else {
					res.send({error: err});
				}
				db.close();
			});
		} else {
			res.send({error: err});
			db.close();
		}
	});
});

app.listen(process.env.PORT || 1010);