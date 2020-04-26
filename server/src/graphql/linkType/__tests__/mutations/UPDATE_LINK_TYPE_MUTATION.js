import gql from 'graphql-tag';

export default gql`
mutation UpdateLinkType( $input: UpdateLinkTypeInput! ) {
  updateLinkType ( input: $input ) {
    linkType {
      name
    }
  }
}
`;
