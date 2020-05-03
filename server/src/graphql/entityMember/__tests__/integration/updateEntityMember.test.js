import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import GET_ENTITY_QUERY from '../../../entity/__tests__/queries/GET_ENTITY_QUERY';
import GET_MEMBER_TYPE_QUERY from '../../../memberType/__tests__/queries/GET_MEMBER_TYPE_QUERY';
import GET_ENTITY_MEMBER_QUERY from '../queries/GET_ENTITY_MEMBER_QUERY';
import UPDATE_ENTITY_MEMBER_MUTATION from '../mutations/UPDATE_ENTITY_MEMBER_MUTATION';

test('update entityMember', async (t) => {
  const { mutate, query, clean } = await createTestClient();

  const entities = await query({
    query: GET_ENTITY_QUERY,
    variables: null,
  });

  const firstEntityId = entities.data.entities[0].id;

  t.notEqual(
    firstEntityId,
    null,
    'should return a entity id',
  );

  clean();

  const firstEntityIdMember = entities.data.entities[1].id;

  t.notEqual(
    firstEntityIdMember,
    null,
    'should return a entity id',
  );

  clean();

  const memberTypes = await query({
    query: GET_MEMBER_TYPE_QUERY,
    variables: null,
  });

  const firstMemberTypeId = memberTypes.data.memberTypes[0].id;

  t.notEqual(
    firstMemberTypeId,
    null,
    'should return a memberType id',
  );

  clean();

  const entityMembers = await query({
    query: GET_ENTITY_MEMBER_QUERY,
    variables: null,
  });

  const firstEntityMemberId = entityMembers.data.entityMembers[0].id;

  t.notEqual(
    firstEntityMemberId,
    null,
    'should return a entityMember id',
  );

  clean();

  const updateResult = await mutate({
    mutation: UPDATE_ENTITY_MEMBER_MUTATION,
    variables: {
      input: {
        id: firstEntityMemberId,
        entityId: parseInt(firstEntityId, 10),
        entityIdMember: parseInt(firstEntityIdMember, 10),
        memberTypeId: parseInt(firstMemberTypeId, 10),
      },
    },
  });

  t.deepEqual(
    omit(['id'], updateResult.data.updateEntityMember.entityMember),
    {
      entityId: parseInt(firstEntityId, 10),
      entityIdMember: parseInt(firstEntityIdMember, 10),
      memberTypeId: parseInt(firstMemberTypeId, 10),
    },
    'should return the updated entityMember',
  );

  clean();

  const emptyEntityResult = await mutate({
    mutation: UPDATE_ENTITY_MEMBER_MUTATION,
    variables: {
      input: {
        entityId: null,
        entityIdMember: parseInt(firstEntityMemberId, 10),
        memberTypeId: parseInt(firstMemberTypeId, 10),
      },
    },
  });

  t.notEqual(
    emptyEntityResult.errors[0].message.search('Field id of required'),
    -1,
    'should receive error if EntityId is null',
  );

  clean();

  const emptyEntityMemberResult = await mutate({
    mutation: UPDATE_ENTITY_MEMBER_MUTATION,
    variables: {
      input: {
        entityId: parseInt(firstEntityId, 10),
        entityIdMember: null,
        memberTypeId: parseInt(firstMemberTypeId, 10),
      },
    },
  });

  t.notEqual(
    emptyEntityMemberResult.errors[0].message.search('Field id of required'),
    -1,
    'should receive error if EntityIdMember is null',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
