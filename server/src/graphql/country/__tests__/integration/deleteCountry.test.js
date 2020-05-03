import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_COUNTRY_QUERY from '../queries/GET_COUNTRY_QUERY';
import DELETE_COUNTRY_MUTATION from '../mutations/DELETE_COUNTRY_MUTATION';

test('delete country', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const countries = await query({
    query: GET_COUNTRY_QUERY,
    variables: null,
  });

  const firstCountryCode = countries.data.countries[0].code;

  t.notEqual(
    firstCountryCode,
    null,
    'should return a country Code',
  );

  clean();

  const deleteResult = await mutate({
    mutation: DELETE_COUNTRY_MUTATION,
    variables: {
      input: {
        code: firstCountryCode,
      },
    },
  });

  if (typeof (deleteResult.errors) !== 'undefined') {
    t.notEqual(
      deleteResult.errors[0].message.search('foreign'),
      -1,
      'should return error if foreign key',
    );
  } else {
    t.equal(deleteResult.data.deleteCountry.count, 1, 'should return 1');

    clean();

    const emptyResult = await mutate({
      mutation: DELETE_COUNTRY_MUTATION,
      variables: {
        input: {
          code: firstCountryCode,
        },
      },
    });

    t.equal(emptyResult.data.deleteCountry.count, 0, 'should return 0');
  }

  t.end();
  test.onFinish(() => process.exit(0));
});
