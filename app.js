const express = require('express');
const bodyParser = require('body-parser');
const friends = require('./controllers/friends');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/friends', friends.getAllFriends);

app.post('/friends', friends.addNewFriend);

app.get('/friends/:id', friends.getFriendById);

app.listen(port, () => console.log(`Listening on port ${port}...`));
