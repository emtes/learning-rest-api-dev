const { Pool } = require('pg');

const pool = new Pool({
  host: '/var/run/postgresql', // Connections to socket because unix
  user: 'enmanuel',
  password: '',
  database: 'friend_information',
});

module.exports = {
  // no cb because we will use with promises
  query: (text, params) => {
    return pool.query(text, params);
  },
};
