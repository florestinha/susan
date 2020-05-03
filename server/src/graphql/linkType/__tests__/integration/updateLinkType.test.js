import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_LINK_TYPE_QUERY from '../queries/GET_LINK_TYPE_QUERY';
import UPDATE_LINK_TYPE_MUTATION from '../mutations/UPDATE_LINK_TYPE_MUTATION';

test('update linkType', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

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

  const updateResult = await mutate({
    mutation: UPDATE_LINK_TYPE_MUTATION,
    variables: {
      input: {
        id: firstLinkTypeId,
        name: randomName,
      },
    },
  });

  t.deepEqual(
    omit(['id'], updateResult.data.updateLinkType.linkType),
    {
      name: randomName,
    },
    'should return the updated linkType',
  );

  clean();

  const secondLinkTypeId = linkTypes.data.linkTypes[1].id;

  const duplicateResult = await mutate({
    mutation: UPDATE_LINK_TYPE_MUTATION,
    variables: {
      input: {
        id: secondLinkTypeId,
        name: randomName,
      },
    },
  });

  t.equal(
    duplicateResult.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if linkType already exists',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
