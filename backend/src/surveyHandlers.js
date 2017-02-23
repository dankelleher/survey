import database from './database';
import { create as createSurvey} from './createSurvey';
import { get as getSurvey} from './getSurvey';
import { creationResponse, getResponse, parseBody } from './lambdaIO'

const client = database();

export function create(event, context, callback) {
  // return control to process handler after callback is called
  // allows db connection pool to stay open
  context.callbackWaitsForEmptyEventLoop = false;

  const entity = parseBody(event);

  try {
    createSurvey(client(), entity.name, entity.elements)
      .then((generatedId) => callback(null, creationResponse(generatedId)),
        callback);
  } catch (e) {
    console.log(e);
    callback(e);
  }
}

export function get(event, context, callback) {
  // return control to process handler after callback is called
  // allows db connection pool to stay open
  context.callbackWaitsForEmptyEventLoop = false;

  console.log(event);

  try {
    getSurvey(client(), event.pathParameters.id)
      .then((survey) => callback(null, getResponse(survey)),
        callback);
  } catch (e) {
    console.log(e);
    callback(e);
  }
}