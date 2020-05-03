import gql from 'graphql-tag';

export default gql`
mutation UpdateContact( $input: UpdateContactInput! ) {
  updateContact ( input: $input ) {
    contact {
      name
      entityId
      main
    }
  }
}
`;
