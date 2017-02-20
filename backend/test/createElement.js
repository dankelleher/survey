import database from '../src/database';
import {create as createSurvey} from '../src/createSurvey';
import {create as createElement} from '../src/createElement';

import {expect} from 'chai'

describe('createElement', function() {

  const client = database()();

  after(function() {
    client.end();
  });

  it('should create an element in an existing survey', async function() {
    const surveyId = await createSurvey(client, 'test survey for createElement');
    const elementId = await createElement(client, surveyId, 'element1');

    expect(elementId).to.exist;
  });

  it('should create multiple elements under the same survey', async function() {
    const surveyId = await createSurvey(client, 'test survey for createElement');

    const [id1, id2, id3] = await Promise.all([
      createElement(client, surveyId, 'element1'),
      createElement(client, surveyId, 'element2'),
      createElement(client, surveyId, 'element3'),
    ]);

    expect([id1, id2, id3]).to.have.members([id1, id1 + 1, id1 + 2]);
  });
});
