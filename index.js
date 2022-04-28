const express = require('express');
const jwt = require('jsonwebtoken');

// const res = require('express/lib/response');

const app = express();

app.use(express.static('public'))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use();

function checkToken(req, res, next){
	

	const token =  req.headers.authorization && req.headers.authorization.split(" ")[1];

	console.log(req.headers.authorization);

	if (!req.headers.authorization || !token){
		res.sendStatus(401);
		return;
	}

	// what do I need to do with the token ?

	// unwrap the decode the token...
	const decoded = jwt.verify(token, 'thisIsMySecret@79874');

	// find the username in the token ?
	const {username} = decoded;
	
	console.log(username);

	// check if the username in the token is 'avermeulen'
	if (username && username === 'avermeulen') {
		next();
	} else {
		res.sendStatus(403);
	}

}


app.get('/api/name', checkToken, function(req, res){
	res.json({
		name: "André Vermeulen"
	})
});

app.post('/api/token', function(req, res){
	const {username} = req.body;
	
	console.log(req.body)

	const token = jwt.sign({
		username
	}, 'thisIsMySecret@79874');

	res.json({
		token
	});

});


app.listen(9001, function(){
	console.log('started on port 9001')
})