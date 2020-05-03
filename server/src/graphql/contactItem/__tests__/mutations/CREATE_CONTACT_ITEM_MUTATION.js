import gql from 'graphql-tag';

export default gql`
mutation CreateContactItem( $input: CreateContactItemInput! ) {
  createContactItem ( input: $input ) {
    contactItem {
      id
      contact
      contactTypeId
      contactId
    }
  }
}
`;
