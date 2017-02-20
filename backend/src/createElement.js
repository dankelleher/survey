function queryError(error) {
  throw error;
}

const extractGeneratedId = (result) => result.rows[0].id;

export function create(client, surveyId, elementName) {
  return client
    .query('INSERT INTO survey_element VALUES (DEFAULT, $1::integer, $2::text) RETURNING id;', [surveyId, elementName])
    .then(extractGeneratedId, queryError);
}

