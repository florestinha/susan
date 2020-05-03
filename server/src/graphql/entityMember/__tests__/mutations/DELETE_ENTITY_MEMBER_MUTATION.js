import gql from 'graphql-tag';

export default gql`
mutation DeleteEntityMember( $input: DeleteEntityMemberInput! ) {
  deleteEntityMember ( input: $input ) {
    count
  }
}
`;
