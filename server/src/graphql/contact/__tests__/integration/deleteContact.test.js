import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_CONTACT_QUERY from '../queries/GET_CONTACT_QUERY';
import DELETE_CONTACT_MUTATION from '../mutations/DELETE_CONTACT_MUTATION';

test('delete contact', async (t) => {
  const { mutate, query, clean } = await createTestClient();

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

  const deleteResult = await mutate({
    mutation: DELETE_CONTACT_MUTATION,
    variables: {
      input: {
        id: firstContactId,
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
    t.equal(deleteResult.data.deleteContact.count, 1, 'should return 1');

    clean();

    const emptyResult = await mutate({
      mutation: DELETE_CONTACT_MUTATION,
      variables: {
        input: {
          id: firstContactId,
        },
      },
    });

    t.equal(emptyResult.data.deleteContact.count, 0, 'should return 4');
  }

  t.end();
  test.onFinish(() => process.exit(0));
});
