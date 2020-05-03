import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_USER_QUERY from '../queries/GET_USER_QUERY';
import UPDATE_USER_MUTATION from '../mutations/UPDATE_USER_MUTATION';

test('update user', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomValue = `${Math.random()}`;

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

  const updateResult = await mutate({
    mutation: UPDATE_USER_MUTATION,
    variables: {
      input: {
        id: firstUserId,
        email: randomValue,
      },
    },
  });

  t.deepEqual(
    updateResult.data.updateUser.user.email,
    randomValue,
    'should return the updated user',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
