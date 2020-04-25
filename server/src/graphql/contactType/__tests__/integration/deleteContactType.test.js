import test from 'tape';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_CONTACT_TYPE_QUERY from '../queries/GET_CONTACT_TYPE_QUERY';
import DELETE_CONTACT_TYPE_MUTATION from '../mutations/DELETE_CONTACT_TYPE_MUTATION';

test('delete contactType', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const contactTypes = await query({
    query: GET_CONTACT_TYPE_QUERY,
    variables: null,
  });

  const firstContactTypeId = contactTypes.data.contactTypes[0].id;

  t.notEqual(
    firstContactTypeId,
    null,
    'should return a contactType id',
  );

  clean();

  const deleteResult = await mutate({
    mutation: DELETE_CONTACT_TYPE_MUTATION,
    variables: {
      input: {
        id: firstContactTypeId,
      },
    },
  });

  t.equal(deleteResult.data.deleteContactType.count, 1, 'should return 1');

  clean();

  const emptyResult = await mutate({
    mutation: DELETE_CONTACT_TYPE_MUTATION,
    variables: {
      input: {
        id: firstContactTypeId,
      },
    },
  });

  t.equal(emptyResult.data.deleteContactType.count, 0, 'should return 4');

  t.end();
  test.onFinish(() => process.exit(0));
});
