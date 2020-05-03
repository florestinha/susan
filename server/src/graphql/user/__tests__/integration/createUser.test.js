import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import CREATE_USER_MUTATION from '../mutations/CREATE_USER_MUTATION';

const bcrypt = require('bcryptjs');

test('create link', async (t) => {
  const { mutate, clean } = await createTestClient();
  const randomValue = `${Math.random()}`;

  const variables = {
    input: {
      email: randomValue,
      password: bcrypt.hashSync(randomValue, 10),
      name: randomValue,
    },
  };

  const createResult = await mutate({
    mutation: CREATE_USER_MUTATION,
    variables,
  });

  t.equal(createResult.errors, undefined, 'should not throw an error');
  t.deepEqual(
    createResult.data.createUser.user.email,
    randomValue,
    'should return the created User',
  );

  clean();

  const duplicateResult = await mutate({
    mutation: CREATE_USER_MUTATION,
    variables,
  });

  t.equal(
    duplicateResult.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if User already exists',
  );

  clean();

  const emptyUserResult = await mutate({
    mutation: CREATE_USER_MUTATION,
    variables: {
      input: {
        email: null,
        password: bcrypt.hashSync(randomValue, 10),
      },
    },
  });

  t.notEqual(
    emptyUserResult.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if Email is null',
  );

  clean();

  const emptyEntityResult = await mutate({
    mutation: CREATE_USER_MUTATION,
    variables: {
      input: {
        email: randomValue,
        password: null,
      },
    },
  });

  t.notEqual(
    emptyEntityResult.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if Password null',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
