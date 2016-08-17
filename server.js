var app = require('express')(),
	MongoClient = require('mongodb').MongoClient,
	bodyParser = require('body-parser');

app.use(bodyParser.json());

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
					res.send('Inserted Successfully.');
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
					res.send('Inserted Successfully.');
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

app.listen(process.env.PORT||3000, function () {
	console.log("Server is live...");
});