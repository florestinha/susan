import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_ENTITY_QUERY from '../../../entity/__tests__/queries/GET_ENTITY_QUERY';
import GET_LINK_TYPE_QUERY from '../../../linkType/__tests__/queries/GET_LINK_TYPE_QUERY';
import CREATE_LINK_MUTATION from '../mutations/CREATE_LINK_MUTATION';

test('create link', async (t) => {
  const { mutate, query, clean } = await createTestClient();
  const randomName = `${Math.random()}`;

  const entities = await query({
    query: GET_ENTITY_QUERY,
    variables: null,
  });

  const firstEntityId = entities.data.entities[0].id;

  t.notEqual(
    firstEntityId,
    null,
    'should return a Entity id',
  );

  clean();

  const linkTypes = await query({
    query: GET_LINK_TYPE_QUERY,
    variables: null,
  });

  const firstLinkTypeId = linkTypes.data.linkTypes[0].id;

  t.notEqual(
    firstLinkTypeId,
    null,
    'should return a LinkType id',
  );

  clean();

  const variables = {
    input: {
      link: randomName,
      main: false,
      entityId: parseInt(firstEntityId, 10),
      linkTypeId: parseInt(firstLinkTypeId, 10),
    },
  };

  const createResult = await mutate({
    mutation: CREATE_LINK_MUTATION,
    variables,
  });

  t.equal(createResult.errors, undefined, 'should not throw an error');
  t.deepEqual(
    omit(['id'], createResult.data.createLink.link),
    {
      link: randomName,
      main: false,
      entityId: parseInt(firstEntityId, 10),
      linkTypeId: parseInt(firstLinkTypeId, 10),
    },
    'should return the created link',
  );

  clean();

  const emptyLinkResult = await mutate({
    mutation: CREATE_LINK_MUTATION,
    variables: {
      input: {
        link: null,
        entityId: parseInt(firstEntityId, 10),
        linkTypeId: parseInt(firstLinkTypeId, 10),
        main: false,
      },
    },
  });

  t.notEqual(
    emptyLinkResult.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if Link is null',
  );

  clean();

  const emptyEntityResult = await mutate({
    mutation: CREATE_LINK_MUTATION,
    variables: {
      input: {
        link: randomName,
        entityId: null,
        linkTypeId: parseInt(firstLinkTypeId, 10),
        main: false,
      },
    },
  });

  t.notEqual(
    emptyEntityResult.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if Entity null',
  );

  clean();

  const emptyLinkTypeResult = await mutate({
    mutation: CREATE_LINK_MUTATION,
    variables: {
      input: {
        link: randomName,
        entityId: parseInt(firstEntityId, 10),
        linkTypeId: null,
        main: false,
      },
    },
  });

  t.notEqual(
    emptyLinkTypeResult.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if LinkType is null',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
