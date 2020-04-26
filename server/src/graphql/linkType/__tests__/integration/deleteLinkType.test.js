import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_LINK_TYPE_QUERY from '../queries/GET_LINK_TYPE_QUERY';
import DELETE_LINK_TYPE_MUTATION from '../mutations/DELETE_LINK_TYPE_MUTATION';

test('delete linkType', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const linkTypes = await query({
    query: GET_LINK_TYPE_QUERY,
    variables: null,
  });

  const firstLinkTypeId = linkTypes.data.linkTypes[0].id;

  t.notEqual(
    firstLinkTypeId,
    null,
    'should return a linkType id',
  );

  clean();

  const deleteResult = await mutate({
    mutation: DELETE_LINK_TYPE_MUTATION,
    variables: {
      input: {
        id: firstLinkTypeId,
      },
    },
  });

  t.equal(deleteResult.data.deleteLinkType.count, 1, 'should return 1');

  clean();

  const emptyResult = await mutate({
    mutation: DELETE_LINK_TYPE_MUTATION,
    variables: {
      input: {
        id: firstLinkTypeId,
      },
    },
  });

  t.equal(emptyResult.data.deleteLinkType.count, 0, 'should return 4');

  t.end();
  test.onFinish(() => process.exit(0));
});
