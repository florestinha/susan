import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_ENTITY_TYPE_QUERY from '../queries/GET_ENTITY_TYPE_QUERY';
import DELETE_ENTITY_TYPE_MUTATION from '../mutations/DELETE_ENTITY_TYPE_MUTATION';

test('delete entityType', async (t) => {
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

  const deleteResult = await mutate({
    mutation: DELETE_ENTITY_TYPE_MUTATION,
    variables: {
      input: {
        id: firstEntityTypeId,
      },
    },
  });

  t.equal(deleteResult.data.deleteEntityType.count, 1, 'should return 1');

  clean();

  const emptyResult = await mutate({
    mutation: DELETE_ENTITY_TYPE_MUTATION,
    variables: {
      input: {
        id: firstEntityTypeId,
      },
    },
  });

  t.equal(emptyResult.data.deleteEntityType.count, 0, 'should return 4');

  t.end();
  test.onFinish(() => process.exit(0));
});
