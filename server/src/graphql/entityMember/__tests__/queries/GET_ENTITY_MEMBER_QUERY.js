import gql from 'graphql-tag';

export default gql`
{
  entityMembers {
    id
    entityId
    entityIdMember
    memberTypeId
  }
}
`;
