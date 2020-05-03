import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_ENTITY_QUERY from '../queries/GET_ENTITY_QUERY';
import UPDATE_ENTITY_MUTATION from '../mutations/UPDATE_ENTITY_MUTATION';

test('update entity', async (t) => {
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

  const updateResult = await mutate({
    mutation: UPDATE_ENTITY_MUTATION,
    variables: {
      input: {
        id: firstEntityId,
        name: randomName,
      },
    },
  });

  t.deepEqual(
    updateResult.data.updateEntity.entity.name,
    randomName,
    'should return the updated entity',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
