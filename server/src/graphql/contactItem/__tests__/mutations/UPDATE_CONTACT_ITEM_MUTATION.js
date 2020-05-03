import gql from 'graphql-tag';

export default gql`
mutation UpdateContactItem( $input: UpdateContactItemInput! ) {
  updateContactItem ( input: $input ) {
    contactItem {
      contact
      contactTypeId
      contactId
    }
  }
}
`;
