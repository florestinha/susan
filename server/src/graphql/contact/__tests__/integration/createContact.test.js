import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_ENTITY_QUERY from '../../../entity/__tests__/queries/GET_ENTITY_QUERY';
import CREATE_CONTACT_MUTATION from '../mutations/CREATE_CONTACT_MUTATION';

test('create contact', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

  const entities = await query({
    query: GET_ENTITY_QUERY,
    variables: null,
  });

  const firstEntityId = entities.data.entities[0].id;

  t.notEqual(
    firstEntityId,
    null,
    'should return a entity id',
  );

  clean();

  const variables = {
    input: {
      name: randomName,
      entityId: parseInt(firstEntityId, 10),
      main: false,
    },
  };

  const createResult = await mutate({
    mutation: CREATE_CONTACT_MUTATION,
    variables,
  });

  t.equal(createResult.errors, undefined, 'should not throw an error');
  t.deepEqual(
    omit(['id'], createResult.data.createContact.contact),
    {
      name: randomName,
      entityId: parseInt(firstEntityId, 10),
      main: false,
    },
    'should return the created contact',
  );

  clean();

  const emptyResult = await mutate({
    mutation: CREATE_CONTACT_MUTATION,
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
