import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_CONTACT_TYPE_QUERY from '../../../contactType/__tests__/queries/GET_CONTACT_TYPE_QUERY';
import GET_CONTACT_QUERY from '../../../contact/__tests__/queries/GET_CONTACT_QUERY';
import CREATE_CONTACT_ITEM_MUTATION from '../mutations/CREATE_CONTACT_ITEM_MUTATION';

test('create contactItem', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const contactTypes = await query({
    query: GET_CONTACT_TYPE_QUERY,
    variables: null,
  });

  const firstContactTypeId = contactTypes.data.contactTypes[0].id;

  t.notEqual(
    firstContactTypeId,
    null,
    'should return a contactItemType id',
  );

  clean();

  const contactItems = await query({
    query: GET_CONTACT_QUERY,
    variables: null,
  });

  const firstContactId = contactItems.data.contacts[0].id;

  t.notEqual(
    firstContactId,
    null,
    'should return a contact id',
  );

  clean();

  const randomValue = `${Math.random()}`;
  const variables = {
    input: {
      contact: randomValue,
      contactTypeId: parseInt(firstContactTypeId, 10),
      contactId: parseInt(firstContactId, 10),
    },
  };

  const createResult = await mutate({
    mutation: CREATE_CONTACT_ITEM_MUTATION,
    variables,
  });

  t.equal(createResult.errors, undefined, 'should not throw an error');
  t.deepEqual(
    omit(['id'], createResult.data.createContactItem.contactItem),
    {
      contact: randomValue,
      contactTypeId: parseInt(firstContactTypeId, 10),
      contactId: parseInt(firstContactId, 10),
    },
    'should return the created contactItem',
  );

  clean();

  const emptyResult = await mutate({
    mutation: CREATE_CONTACT_ITEM_MUTATION,
    variables: {
      input: {
        contact: null,
      },
    },
  });

  t.notEqual(
    emptyResult.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if contact is null',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
