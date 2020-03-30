const db = require('../db');

// What do we expect to receive as a reponse when they GET /friends?
const getAllFriends = (req, res) => {
  db.query('SELECT * FROM friend')
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: '500: Internal Server Error.' });
    });
};

const getFriendById = (req, res) => {
  const friendId = req.params.id;
  db.query('SELECT * FROM friend WHERE id = $1', [friendId])
    .then((friendData) => {
      // Its nice to give single obj instead of arr with single obj
      res.status(200).json(friendData.rows[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal Server Error.' });
    });
};

const addNewFriend = (req, res) => {
  const { first_name, last_name, age } = req.body;
  const insertFriendQuery = `
  INSERT INTO friend (first_name, last_name, age)
  VALUES($1, $2, $3)`;
  db.query(insertFriendQuery, [first_name, last_name, age])
    .then((dat) => {
      console.log('You inserted a friend!');
      res.status(201).json(dat);
    })
    .catch((err) => {
      console.error('Error adding new friend', err);
      res
        .status(500)
        .json({ error: 'Internal Server Error. Resource not created.' });
    });
};

module.exports = {
  getAllFriends,
  getFriendById,
  addNewFriend,
};
