import gql from 'graphql-tag';

export default gql`
mutation UpdateContactType( $input: UpdateContactTypeInput! ) {
  updateContactType ( input: $input ) {
    contactType {
      name
    }
  }
}
`;
