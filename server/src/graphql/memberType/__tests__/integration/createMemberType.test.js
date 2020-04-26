import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import CREATE_MEMBER_TYPE_MUTATION from '../mutations/CREATE_MEMBER_TYPE_MUTATION';

test('create memberType', async (t) => {
  const { mutate, clean } = await createTestClient();
  const randomName = `${Math.random()}`;
  const variables = {
    input: {
      name: randomName,
    },
  };

  const createResult = await mutate({
    mutation: CREATE_MEMBER_TYPE_MUTATION,
    variables,
  });

  t.equal(createResult.errors, undefined, 'should not throw an error');
  t.deepEqual(
    omit(['id'], createResult.data.createMemberType.memberType),
    {
      name: randomName,
    },
    'should return the created memberType',
  );

  clean();

  const duplicateResult = await mutate({
    mutation: CREATE_MEMBER_TYPE_MUTATION,
    variables,
  });

  t.equal(
    duplicateResult.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if memberType already exists',
  );

  clean();

  const emptyResult = await mutate({
    mutation: CREATE_MEMBER_TYPE_MUTATION,
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
