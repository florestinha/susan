import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_CONTACT_QUERY from '../queries/GET_CONTACT_QUERY';
import UPDATE_CONTACT_MUTATION from '../mutations/UPDATE_CONTACT_MUTATION';

test('update contact', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

  const contacts = await query({
    query: GET_CONTACT_QUERY,
    variables: null,
  });

  const firstContactId = contacts.data.contacts[0].id;

  t.notEqual(
    firstContactId,
    null,
    'should return a contact id',
  );

  clean();

  const updateResult = await mutate({
    mutation: UPDATE_CONTACT_MUTATION,
    variables: {
      input: {
        id: firstContactId,
        name: randomName,
      },
    },
  });

  t.deepEqual(
    updateResult.data.updateContact.contact.name,
    randomName,
    'should return the updated contact',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
