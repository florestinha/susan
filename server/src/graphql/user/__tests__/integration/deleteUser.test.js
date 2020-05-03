import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_USER_QUERY from '../queries/GET_USER_QUERY';
import DELETE_USER_MUTATION from '../mutations/DELETE_USER_MUTATION';

test('delete user', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const users = await query({
    query: GET_USER_QUERY,
    variables: null,
  });

  const firstUserId = users.data.users[0].id;

  t.notEqual(
    firstUserId,
    null,
    'should return a user id',
  );

  clean();

  const deleteResult = await mutate({
    mutation: DELETE_USER_MUTATION,
    variables: {
      input: {
        id: firstUserId,
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
    t.equal(deleteResult.data.deleteUser.count, 1, 'should return 1');

    clean();

    const emptyResult = await mutate({
      mutation: DELETE_USER_MUTATION,
      variables: {
        input: {
          id: firstUserId,
        },
      },
    });

    t.equal(emptyResult.data.deleteUser.count, 0, 'should return 4');
  }

  t.end();
  test.onFinish(() => process.exit(0));
});
