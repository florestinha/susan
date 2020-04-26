import gql from 'graphql-tag';

export default gql`
mutation CreateEntityType( $input: CreateEntityTypeInput! ) {
  createEntityType ( input: $input ) {
    entityType {
      name
      id
    }
  }
}
`;
