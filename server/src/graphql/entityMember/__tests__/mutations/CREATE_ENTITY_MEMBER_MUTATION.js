import gql from 'graphql-tag';

export default gql`
mutation CreateEntityMember( $input: CreateEntityMemberInput! ) {
  createEntityMember ( input: $input ) {
    entityMember {
      id
      entityId
      entityIdMember
      memberTypeId
    }
  }
}
`;
