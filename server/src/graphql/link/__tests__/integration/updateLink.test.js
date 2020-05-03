import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_LINK_QUERY from '../queries/GET_LINK_QUERY';
import UPDATE_LINK_MUTATION from '../mutations/UPDATE_LINK_MUTATION';

test('update link', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomLink = `${Math.random()}`;

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

  const updateResult = await mutate({
    mutation: UPDATE_LINK_MUTATION,
    variables: {
      input: {
        id: firstLinkId,
        link: randomLink,
      },
    },
  });

  t.deepEqual(
    updateResult.data.updateLink.link.link,
    randomLink,
    'should return the updated link',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
