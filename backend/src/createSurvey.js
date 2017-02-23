import R from 'ramda';

import {create as createElement} from './createElement'

function queryError(error) {
  throw error;
}

const extractGeneratedId = (result) => result.rows[0].id;

export async function create(client, surveyName, elements = []) {
  const creationResult = await client
    .query('INSERT INTO survey VALUES (DEFAULT, $1::text) RETURNING id;', [surveyName])
    .catch(queryError);

  const surveyId = extractGeneratedId(creationResult);

  const addElementToSurvey = R.curry(createElement)(client, surveyId);

  await Promise.all(elements.map(addElementToSurvey)).catch(queryError);

  return surveyId;
}

