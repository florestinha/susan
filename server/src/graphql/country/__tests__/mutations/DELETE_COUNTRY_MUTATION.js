import gql from 'graphql-tag';

export default gql`
mutation DeleteCountry( $input: DeleteCountryInput! ) {
  deleteCountry ( input: $input ) {
    count
  }
}
`;
