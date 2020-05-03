import gql from 'graphql-tag';

export default gql`
mutation UpdateEntityMember( $input: UpdateEntityMemberInput! ) {
  updateEntityMember ( input: $input ) {
    entityMember {
      entityId
      entityIdMember
      memberTypeId
    }
  }
}
`;
