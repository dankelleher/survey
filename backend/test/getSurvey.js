import database from '../src/database';
import {create as createSurvey} from '../src/createSurvey';
import {create as createElement} from '../src/createElement';
import {get} from '../src/getSurvey';

import {expect} from 'chai'

describe('getSurvey', function() {

  const client = database()();

  const surveyName = 'test survey for getSurvey';
  let surveyId;

  before(async function() {
    surveyId = await createSurvey(client, surveyName);

    await Promise.all([
      createElement(client, surveyId, 'element1'),
      createElement(client, surveyId, 'element2'),
      createElement(client, surveyId, 'element3'),
    ])
  });

  after(function() {
    client.end();
  });

  it('should get a survey by ID', async function() {
    const survey = await get(client, surveyId);

    expect(survey.name).to.equal(surveyName);
  });

  it('should get a survey\'s elements', async function() {
    const survey = await get(client, surveyId);

    expect(survey.elements).to.include('element1', 'element2', 'element3');
  });
});
