const pg = require('pg');

export default function(config) {
  const client = new pg.Client(config);
  let connected = false;

  // return a getter function for the client. Connect if not connected
  return () => {
    if (!connected) {
      connected = true;

      // connect to the database - once per client - happens once per lambda container
      client.connect();
    }

    return client;
  }
};