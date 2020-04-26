import gql from 'graphql-tag';

export default gql`
mutation DeleteMemberType( $input: DeleteMemberTypeInput! ) {
  deleteMemberType ( input: $input ) {
    count
  }
}
`;
