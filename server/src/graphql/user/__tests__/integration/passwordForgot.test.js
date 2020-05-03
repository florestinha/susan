import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_USER_QUERY from '../queries/GET_USER_QUERY';
import PASSWORD_FORGOT_MUTATION from '../mutations/PASSWORD_FORGOT_MUTATION';

test('update user', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const users = await query({
    query: GET_USER_QUERY,
    variables: null,
  });

  const firstUserEmail = users.data.users[0].email;

  t.notEqual(
    firstUserEmail,
    null,
    'should return a User Email',
  );

  clean();

  const passwordForgotResult = await mutate({
    mutation: PASSWORD_FORGOT_MUTATION,
    variables: {
      input: {
        email: firstUserEmail,
      },
    },
  });

  t.ok(
    passwordForgotResult.data.passwordForgot.success,
    'should return success',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
