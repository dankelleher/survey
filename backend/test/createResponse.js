import database from '../src/database';
import {create as createSurvey} from '../src/createSurvey';
import {create as createElement} from '../src/createElement';
import {create as createResponse} from '../src/createResponse';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('createResponse', function() {

  const client = database()();
  const elements = ['element1', 'element2', 'element3'];
  let surveyId;

  before(async function() {
    surveyId = await createSurvey(client, 'test survey for createResponse');

    const elementIdPromises = elements.map(element => createElement(client, surveyId, element));

    return Promise.all(elementIdPromises);
  });

  after(function() {
    client.end();
  });

  it('should create a response', async function() {
    const responseId = await createResponse(client, surveyId, [elements[1], elements[0], elements[2]]);

    expect(responseId).to.exist;
  });

  it('should fail if an element is missing', async function() {
    const createResponsePromise = createResponse(client, surveyId, [elements[0], elements[2]]);

    return expect(createResponsePromise).to.eventually.be.rejectedWith(Error);
  });

  it('should fail if an element is repeated', async function() {
    const createResponsePromise = createResponse(client, surveyId, [elements[1], elements[1], elements[0], elements[2]]);

    return expect(createResponsePromise).to.eventually.be.rejectedWith(Error);
  });

  it('should fail if an element is unknown', async function() {
    const createResponsePromise = createResponse(client, surveyId, [elements[0], elements[1], elements[2], 'What is this element?']);

    return expect(createResponsePromise).to.eventually.be.rejectedWith(Error);
  });
});
