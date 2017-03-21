import database from '../src/database';
import {create as createSurvey} from '../src/createSurvey';
import {create as createElement} from '../src/createElement';
import {create as createResponse} from '../src/createResponse';
import {get as getAverageResponse} from '../src/getAverageResponse';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('getAverageResponse', function() {

  const client = database()();
  const elements = ['element1', 'element2', 'element3'];
  let surveyId;

  beforeEach(async function() {
    surveyId = await createSurvey(client, 'test survey for createResponse');

    const elementIdPromises = elements.map(element => createElement(client, surveyId, element));

    await Promise.all(elementIdPromises);
  });

  after(function() {
    client.end();
  });

  it('when only one response exists, should get that response', async function() {
    const singleResponse = [elements[1], elements[0], elements[2]];

    await createResponse(client, surveyId, singleResponse);

    const averageResponse = await getAverageResponse(client, surveyId);

    expect(averageResponse).to.deep.equal(singleResponse)
  });

  it('when several response exist, should get the average response', async function() {
    const responses = [
      [elements[2], elements[0], elements[1]],
      [elements[2], elements[1], elements[0]],
      [elements[1], elements[0], elements[2]]
    ];

    const expectedAverageResponse = [elements[2], elements[1], elements[0]];

    await Promise.all(responses.map(response => createResponse(client, surveyId, response)));

    const averageResponse = await getAverageResponse(client, surveyId);

    expect(averageResponse).to.deep.equal(expectedAverageResponse)
  });
});
