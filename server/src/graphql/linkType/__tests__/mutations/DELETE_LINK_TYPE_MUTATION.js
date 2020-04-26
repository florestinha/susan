import gql from 'graphql-tag';

export default gql`
mutation DeleteLinkType( $input: DeleteLinkTypeInput! ) {
  deleteLinkType ( input: $input ) {
    count
  }
}
`;
