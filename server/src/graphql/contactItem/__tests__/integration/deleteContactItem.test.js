import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_CONTACT_ITEM_QUERY from '../queries/GET_CONTACT_ITEM_QUERY';
import DELETE_CONTACT_ITEM_MUTATION from '../mutations/DELETE_CONTACT_ITEM_MUTATION';

test('delete contactItem', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const contactItems = await query({
    query: GET_CONTACT_ITEM_QUERY,
    variables: null,
  });

  const firstContactItemId = contactItems.data.contactItems[0].id;

  t.notEqual(
    firstContactItemId,
    null,
    'should return a contactItem id',
  );

  clean();

  const deleteResult = await mutate({
    mutation: DELETE_CONTACT_ITEM_MUTATION,
    variables: {
      input: {
        id: firstContactItemId,
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
    t.equal(deleteResult.data.deleteContactItem.count, 1, 'should return 1');

    clean();

    const emptyResult = await mutate({
      mutation: DELETE_CONTACT_ITEM_MUTATION,
      variables: {
        input: {
          id: firstContactItemId,
        },
      },
    });

    t.equal(emptyResult.data.deleteContactItem.count, 0, 'should return 4');
  }

  t.end();
  test.onFinish(() => process.exit(0));
});
