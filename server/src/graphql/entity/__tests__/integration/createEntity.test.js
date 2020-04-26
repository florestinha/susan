import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_ENTITY_TYPE_QUERY from '../../../entityType/__tests__/queries/GET_ENTITY_TYPE_QUERY';
import GET_COUNTRY_QUERY from '../../../country/__tests__/queries/GET_COUNTRY_QUERY';
import CREATE_ENTITY_MUTATION from '../mutations/CREATE_ENTITY_MUTATION';

test('create entity', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const entityTypes = await query({
    query: GET_ENTITY_TYPE_QUERY,
    variables: null,
  });

  const firstEntityTypeId = entityTypes.data.entityTypes[0].id;

  t.notEqual(
    firstEntityTypeId,
    null,
    'should return a entityType id',
  );

  clean();

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

  const randomValue = `${Math.random()}`;
  const randomInt = Math.floor(Math.random() * 100);
  const variables = {
    input: {
      name: randomValue,
      description: randomValue,
      address: randomValue,
      addressComplement: randomValue,
      city: randomValue,
      region: randomValue,
      postCode: randomValue,
      longitude: randomInt,
      latitude: randomInt,
      entityTypeId: parseInt(firstEntityTypeId, 10),
      countryCode: firstCountryCode,
    },
  };

  const createResult = await mutate({
    mutation: CREATE_ENTITY_MUTATION,
    variables,
  });

  t.equal(createResult.errors, undefined, 'should not throw an error');
  t.deepEqual(
    omit(['id'], createResult.data.createEntity.entity),
    {
      name: randomValue,
      description: randomValue,
      address: randomValue,
      addressComplement: randomValue,
      city: randomValue,
      region: randomValue,
      postCode: randomValue,
      longitude: randomInt,
      latitude: randomInt,
      entityTypeId: parseInt(firstEntityTypeId, 10),
      countryCode: firstCountryCode,
    },
    'should return the created entity',
  );

  clean();

  const emptyResult = await mutate({
    mutation: CREATE_ENTITY_MUTATION,
    variables: {
      input: {
        name: null,
      },
    },
  });

  t.notEqual(
    emptyResult.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if name is null',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
