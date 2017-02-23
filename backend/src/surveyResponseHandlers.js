import database from './database';
import { create as createResponse} from './createResponse';
//import { get as getAverageResponse} from './getAverageResponse';
import { creationResponse, getResponse } from './lambdaIO'

const client = database();

export function create(event, context, callback) {
  // return control to process handler after callback is called
  // allows db connection pool to stay open
  context.callbackWaitsForEmptyEventLoop = false;

  const entity = parseBody(event);

  try {
    createResponse(client(), event.pathParameters.id, entity.elements)
      .then((generatedId) => callback(null, creationResponse(generatedId)),
        callback);
  } catch (e) {
    console.log(e);
    callback(e);
  }
}

// export function get(event, context, callback) {
//   // return control to process handler after callback is called
//   // allows db connection pool to stay open
//   context.callbackWaitsForEmptyEventLoop = false;
//
//   try {
//     getSurvey(client(), event.pathParameters.id)
//       .then((survey) => callback(null, getResponse(survey)));
//   } catch (e) {
//     console.log(e);
//     callback(e);
//   }
// }