import gql from 'graphql-tag';

export default gql`
mutation DeleteContactItem( $input: DeleteContactItemInput! ) {
  deleteContactItem ( input: $input ) {
    count
  }
}
`;
