import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_LINK_QUERY from '../queries/GET_LINK_QUERY';
import DELETE_LINK_MUTATION from '../mutations/DELETE_LINK_MUTATION';

test('delete link', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const links = await query({
    query: GET_LINK_QUERY,
    variables: null,
  });

  const firstLinkId = links.data.links[0].id;

  t.notEqual(
    firstLinkId,
    null,
    'should return a link id',
  );

  clean();

  const deleteResult = await mutate({
    mutation: DELETE_LINK_MUTATION,
    variables: {
      input: {
        id: firstLinkId,
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
    t.equal(deleteResult.data.deleteLink.count, 1, 'should return 1');

    clean();

    const emptyResult = await mutate({
      mutation: DELETE_LINK_MUTATION,
      variables: {
        input: {
          id: firstLinkId,
        },
      },
    });

    t.equal(emptyResult.data.deleteLink.count, 0, 'should return 4');
  }

  t.end();
  test.onFinish(() => process.exit(0));
});
