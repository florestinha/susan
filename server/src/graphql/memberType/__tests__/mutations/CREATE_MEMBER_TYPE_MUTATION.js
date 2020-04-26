import gql from 'graphql-tag';

export default gql`
mutation CreateMemberType( $input: CreateMemberTypeInput! ) {
  createMemberType ( input: $input ) {
    memberType {
      name
      id
    }
  }
}
`;
