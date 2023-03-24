const express = require("express");
var path = require('path');

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(path.join(__dirname, 'CADV_FINAL_SUBMISSION')));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'CADV_FINAL_SUBMISSION/index.html'));
});

app.listen(port, () => {
	console.log('Server started');
	console.log(port);
});
