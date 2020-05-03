import gql from 'graphql-tag';

export default gql`
mutation CreateLink( $input: CreateLinkInput! ) {
  createLink ( input: $input ) {
    link {
      id
      link
      main
      entityId
      linkTypeId
    }
  }
}
`;
