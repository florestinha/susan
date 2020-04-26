import gql from 'graphql-tag';

export default gql`
mutation UpdateMemberType( $input: UpdateMemberTypeInput! ) {
  updateMemberType ( input: $input ) {
    memberType {
      name
    }
  }
}
`;
