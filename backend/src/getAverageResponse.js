import R from 'ramda';

function queryError(error) {
  throw error;
}

const rows = R.prop('rows');
const names = R.pluck('name');
const rowNames = R.compose(names, rows);

const sql = `
SELECT e.name FROM survey_response r
INNER JOIN survey_element e ON r.survey_element_id = e.id
WHERE e.survey_id = $1::integer
GROUP BY e.id, e.name
ORDER BY avg(r.rank);
`;

export async function get(client, surveyId) {

  const averageResponse = await client
    .query(sql, [surveyId])
    .catch(queryError);

  return rowNames(averageResponse);
}

