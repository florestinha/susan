import gql from 'graphql-tag';

export default gql`
mutation UpdateEntityType( $input: UpdateEntityTypeInput! ) {
  updateEntityType ( input: $input ) {
    entityType {
      name
    }
  }
}
`;
