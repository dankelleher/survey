import R from 'ramda';

function queryError(error) {
  throw error;
}

const rows = R.prop('rows');
const names = R.pluck('name');
const rowNames = R.compose(names, rows);
const firstRowName = R.compose(R.head, rowNames);

export async function get(client, surveyId) {

  const surveyNamePr = client
    .query('SELECT name FROM survey WHERE id = $1::integer', [surveyId])
    .then(firstRowName, queryError);

  const elementsPr = client
    .query('SELECT name FROM survey_element WHERE survey_id = $1::integer', [surveyId])
    .then(rowNames, queryError);

  const [name, elements] = await Promise.all([surveyNamePr, elementsPr]);

  return {
    name,
    elements
  }
}

