import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_ENTITY_TYPE_QUERY from '../queries/GET_ENTITY_TYPE_QUERY';
import UPDATE_ENTITY_TYPE_MUTATION from '../mutations/UPDATE_ENTITY_TYPE_MUTATION';

test('update entityType', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

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

  const updateResult = await mutate({
    mutation: UPDATE_ENTITY_TYPE_MUTATION,
    variables: {
      input: {
        id: firstEntityTypeId,
        name: randomName,
      },
    },
  });

  t.deepEqual(
    omit(['id'], updateResult.data.updateEntityType.entityType),
    {
      name: randomName,
    },
    'should return the updated entityType',
  );

  clean();

  const secondEntityTypeId = entityTypes.data.entityTypes[1].id;

  const duplicateResult = await mutate({
    mutation: UPDATE_ENTITY_TYPE_MUTATION,
    variables: {
      input: {
        id: secondEntityTypeId,
        name: randomName,
      },
    },
  });

  t.equal(
    duplicateResult.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if entityType already exists',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
