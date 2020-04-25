import gql from 'graphql-tag';

export default gql`
mutation DeleteContactType( $input: DeleteContactTypeInput! ) {
  deleteContactType ( input: $input ) {
    count
  }
}
`;
