import R from 'ramda';

const rows = R.prop('rows');
const nameAndId = R.props(['name', 'id']);
const nameAndIdPairs = R.map(nameAndId);
const mapNameToId = R.compose(R.fromPairs, nameAndIdPairs, rows);

const newResponseId = R.prop('new_id');
const firstRowNewResponseId = R.compose(newResponseId, R.head, rows);
const objectSize = R.compose(R.length, R.keys);

function queryError(error) {
  throw error;
}

function responseInsertPromise(client, responseId, surveyElementId, rank) {
  return client
    .query('INSERT INTO survey_response VALUES ($1::integer, $2::integer, $3::integer);', [responseId, surveyElementId, rank])
    .catch(queryError);
}

function getSurveyElementsPromise(client, surveyId) {
  return client
    .query('SELECT * FROM survey_element WHERE survey_id = $1::integer', [surveyId])
    .then(mapNameToId, queryError)
}

function getNextResponseId(client) {
  return client
    .query('SELECT NEXTVAL(pg_get_serial_sequence(\'survey_response\', \'response_id\')) as new_id')
    .then(firstRowNewResponseId, queryError);
}

export async function create(client, surveyId, elementArray) {
  const surveyElementsMap = await getSurveyElementsPromise(client, surveyId);

  if (objectSize(surveyElementsMap) > elementArray.length) {
    throw new Error("Missing elements from response");
  }

  const responseId = await getNextResponseId(client);

  const idRankPairs = elementArray.map((element, rank) => [surveyElementsMap[element], rank]);

  const allInsertPromises = idRankPairs.map(([elementId, rank]) => responseInsertPromise(client, responseId, elementId, rank));

  await Promise.all(allInsertPromises);

  return responseId;
}

