import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_ENTITY_QUERY from '../queries/GET_ENTITY_QUERY';
import DELETE_ENTITY_MUTATION from '../mutations/DELETE_ENTITY_MUTATION';

test('delete entity', async (t) => {
  const { mutate, query, clean } = await createTestClient();

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

  const deleteResult = await mutate({
    mutation: DELETE_ENTITY_MUTATION,
    variables: {
      input: {
        id: firstEntityId,
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
    t.equal(deleteResult.data.deleteEntity.count, 1, 'should return 1');

    clean();

    const emptyResult = await mutate({
      mutation: DELETE_ENTITY_MUTATION,
      variables: {
        input: {
          id: firstEntityId,
        },
      },
    });

    t.equal(emptyResult.data.deleteEntity.count, 0, 'should return 4');
  }

  t.end();
  test.onFinish(() => process.exit(0));
});
