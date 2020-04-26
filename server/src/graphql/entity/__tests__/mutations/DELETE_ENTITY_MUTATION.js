import gql from 'graphql-tag';

export default gql`
mutation DeleteEntity( $input: DeleteEntityInput! ) {
  deleteEntity ( input: $input ) {
    count
  }
}
`;
