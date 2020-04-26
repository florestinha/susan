import gql from 'graphql-tag';

export default gql`
mutation CreateLinkType( $input: CreateLinkTypeInput! ) {
  createLinkType ( input: $input ) {
    linkType {
      name
      id
    }
  }
}
`;
