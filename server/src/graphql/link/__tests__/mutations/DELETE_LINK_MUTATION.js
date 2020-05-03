import gql from 'graphql-tag';

export default gql`
mutation DeleteLink( $input: DeleteLinkInput! ) {
  deleteLink ( input: $input ) {
    count
  }
}
`;
