import gql from 'graphql-tag';

export default gql`
mutation UpdateLink( $input: UpdateLinkInput! ) {
  updateLink ( input: $input ) {
    link {
      link
      main
      entityId
      linkTypeId
    }
  }
}
`;
