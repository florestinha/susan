import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_CONTACT_TYPE_QUERY from '../queries/GET_CONTACT_TYPE_QUERY';
import UPDATE_CONTACT_TYPE_MUTATION from '../mutations/UPDATE_CONTACT_TYPE_MUTATION';

test('update contactType', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

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

  const updateResult = await mutate({
    mutation: UPDATE_CONTACT_TYPE_MUTATION,
    variables: {
      input: {
        id: firstContactTypeId,
        name: randomName,
      },
    },
  });

  t.deepEqual(
    omit(['id'], updateResult.data.updateContactType.contactType),
    {
      name: randomName,
    },
    'should return the updated contactType',
  );

  clean();

  const secondContactTypeId = contactTypes.data.contactTypes[1].id;

  const duplicateResult = await mutate({
    mutation: UPDATE_CONTACT_TYPE_MUTATION,
    variables: {
      input: {
        id: secondContactTypeId,
        name: randomName,
      },
    },
  });

  t.equal(
    duplicateResult.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if contactType already exists',
  );

  clean();

  const emptyResult = await mutate({
    mutation: UPDATE_CONTACT_TYPE_MUTATION,
    variables: {
      input: {
        id: secondContactTypeId,
        name: null,
      },
    },
  });

  t.notEqual(
    emptyResult.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if name is null',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
