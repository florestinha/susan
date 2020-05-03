import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_CONTACT_ITEM_QUERY from '../queries/GET_CONTACT_ITEM_QUERY';
import UPDATE_CONTACT_ITEM_MUTATION from '../mutations/UPDATE_CONTACT_ITEM_MUTATION';

test('update contactItem', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

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

  const updateResult = await mutate({
    mutation: UPDATE_CONTACT_ITEM_MUTATION,
    variables: {
      input: {
        id: firstContactItemId,
        contact: randomName,
      },
    },
  });

  t.deepEqual(
    updateResult.data.updateContactItem.contactItem.contact,
    randomName,
    'should return the updated contactItem',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
