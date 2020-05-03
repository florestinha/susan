import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_MEMBER_TYPE_QUERY from '../queries/GET_MEMBER_TYPE_QUERY';
import UPDATE_MEMBER_TYPE_MUTATION from '../mutations/UPDATE_MEMBER_TYPE_MUTATION';

test('update memberType', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

  const memberTypes = await query({
    query: GET_MEMBER_TYPE_QUERY,
    variables: null,
  });

  const firstMemberTypeId = memberTypes.data.memberTypes[0].id;

  t.notEqual(
    firstMemberTypeId,
    null,
    'should return a memberType id',
  );

  clean();

  const updateResult = await mutate({
    mutation: UPDATE_MEMBER_TYPE_MUTATION,
    variables: {
      input: {
        id: firstMemberTypeId,
        name: randomName,
      },
    },
  });

  t.deepEqual(
    omit(['id'], updateResult.data.updateMemberType.memberType),
    {
      name: randomName,
    },
    'should return the updated memberType',
  );

  clean();

  const secondMemberTypeId = memberTypes.data.memberTypes[1].id;

  const duplicateResult = await mutate({
    mutation: UPDATE_MEMBER_TYPE_MUTATION,
    variables: {
      input: {
        id: secondMemberTypeId,
        name: randomName,
      },
    },
  });

  t.equal(
    duplicateResult.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if memberType already exists',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
