import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_MEMBER_TYPE_QUERY from '../queries/GET_MEMBER_TYPE_QUERY';
import DELETE_MEMBER_TYPE_MUTATION from '../mutations/DELETE_MEMBER_TYPE_MUTATION';

test('delete memberType', async (t) => {
  const { mutate, query, clean } = await createTestClient();

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

  const deleteResult = await mutate({
    mutation: DELETE_MEMBER_TYPE_MUTATION,
    variables: {
      input: {
        id: firstMemberTypeId,
      },
    },
  });

  t.equal(deleteResult.data.deleteMemberType.count, 1, 'should return 1');

  clean();

  const emptyResult = await mutate({
    mutation: DELETE_MEMBER_TYPE_MUTATION,
    variables: {
      input: {
        id: firstMemberTypeId,
      },
    },
  });

  t.equal(emptyResult.data.deleteMemberType.count, 0, 'should return 4');

  t.end();
  test.onFinish(() => process.exit(0));
});
