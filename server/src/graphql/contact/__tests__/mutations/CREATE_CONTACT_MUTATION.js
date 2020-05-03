import gql from 'graphql-tag';

export default gql`
mutation CreateContact( $input: CreateContactInput! ) {
  createContact ( input: $input ) {
    contact {
      name
      entityId
      main
      id
    }
  }
}
`;
