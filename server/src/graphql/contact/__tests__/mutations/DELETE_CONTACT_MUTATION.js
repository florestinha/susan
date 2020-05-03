import gql from 'graphql-tag';

export default gql`
mutation DeleteContact( $input: DeleteContactInput! ) {
  deleteContact ( input: $input ) {
    count
  }
}
`;
