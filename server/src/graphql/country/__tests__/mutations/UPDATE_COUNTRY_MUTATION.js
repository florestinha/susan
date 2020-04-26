import gql from 'graphql-tag';

export default gql`
mutation UpdateCountry( $input: UpdateCountryInput! ) {
  updateCountry ( input: $input ) {
    country {
      name
      code
    }
  }
}
`;
