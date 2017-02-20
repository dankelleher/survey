function queryError(error) {
  throw error;
}

const extractGeneratedId = (result) => result.rows[0].id;

export function create(client, surveyName) {
  return client
    .query('INSERT INTO survey VALUES (DEFAULT, $1::text) RETURNING id;', [surveyName])
    .then(extractGeneratedId, queryError);
}

