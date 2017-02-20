import database from './database';
import { create as createSurvey} from './createSurvey';
import { get as getSurvey} from './getSurvey';

const client = database();

function creationResponse(generatedId) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Created successfully',
      id: generatedId,
    }),
  };
}

function getResponse(survey) {
  return {
    statusCode: 200,
    body: JSON.stringify(survey),
  };
}

export function create(event, context, callback) {
  // return control to process handler after callback is called
  // allows db connection pool to stay open
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    createSurvey(client(), event.name)
      .then((generatedId) => callback(null, creationResponse(generatedId)));
  } catch (e) {
    console.log(e);
    callback(e);
  }
}

export function get(event, context, callback) {
  // return control to process handler after callback is called
  // allows db connection pool to stay open
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    getSurvey(client(), event.id)
      .then((survey) => callback(null, getResponse(survey)));
  } catch (e) {
    console.log(e);
    callback(e);
  }
}