import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import CREATE_LINK_TYPE_MUTATION from '../mutations/CREATE_LINK_TYPE_MUTATION';

test('create linkType', async (t) => {
  const { mutate, clean } = await createTestClient();
  const randomName = `${Math.random()}`;
  const variables = {
    input: {
      name: randomName,
    },
  };

  const createResult = await mutate({
    mutation: CREATE_LINK_TYPE_MUTATION,
    variables,
  });

  t.equal(createResult.errors, undefined, 'should not throw an error');
  t.deepEqual(
    omit(['id'], createResult.data.createLinkType.linkType),
    {
      name: randomName,
    },
    'should return the created linkType',
  );

  clean();

  const duplicateResult = await mutate({
    mutation: CREATE_LINK_TYPE_MUTATION,
    variables,
  });

  t.equal(
    duplicateResult.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if linkType already exists',
  );

  clean();

  const emptyResult = await mutate({
    mutation: CREATE_LINK_TYPE_MUTATION,
    variables: {
      input: {
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
