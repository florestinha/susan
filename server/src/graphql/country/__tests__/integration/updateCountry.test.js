import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_COUNTRY_QUERY from '../queries/GET_COUNTRY_QUERY';
import UPDATE_COUNTRY_MUTATION from '../mutations/UPDATE_COUNTRY_MUTATION';

test('update country', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

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

  const updateResult = await mutate({
    mutation: UPDATE_COUNTRY_MUTATION,
    variables: {
      input: {
        code: firstCountryCode,
        name: randomName,
      },
    },
  });

  t.deepEqual(
    omit(['code'], updateResult.data.updateCountry.country),
    {
      name: randomName,
    },
    'should return the updated country',
  );

  clean();

  const secondCountryCode = countries.data.countries[1].code;

  const duplicateResult = await mutate({
    mutation: UPDATE_COUNTRY_MUTATION,
    variables: {
      input: {
        code: secondCountryCode,
        name: randomName,
      },
    },
  });

  t.equal(
    duplicateResult.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if country already exists',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
