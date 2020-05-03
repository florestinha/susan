import gql from 'graphql-tag';

export default gql`
mutation UpdateUser( $input: UpdateUserInput! ) {
  updateUser ( input: $input ) {
    user {
      email
      entityId
    }
  }
}
`;
