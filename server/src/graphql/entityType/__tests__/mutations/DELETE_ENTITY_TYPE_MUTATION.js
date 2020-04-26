import gql from 'graphql-tag';

export default gql`
mutation DeleteEntityType( $input: DeleteEntityTypeInput! ) {
  deleteEntityType ( input: $input ) {
    count
  }
}
`;
