import database from '../src/database';
import {create} from '../src/createSurvey';

import {expect} from 'chai'

describe('createSurvey', function() {

  const client = database()();

  after(function() {
    client.end();
  });

  it('should create a survey', async function() {
    const generatedId = await create(client, 'test survey for createSurvey');

    expect(generatedId).to.exist;
  });

  it('should create multiple surveys', async function() {
    const [id1, id2, id3] = await Promise.all([
      create(client, 'test survey 1'),
      create(client, 'test survey 2'),
      create(client, 'test survey 3')
    ]);

    expect([id1, id2, id3]).to.have.members([id1, id1 + 1, id1 + 2]);
  });
});
