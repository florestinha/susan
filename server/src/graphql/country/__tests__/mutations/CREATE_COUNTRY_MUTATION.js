import gql from 'graphql-tag';

export default gql`
mutation CreateCountry( $input: CreateCountryInput! ) {
  createCountry ( input: $input ) {
    country {
      name
      code
    }
  }
}
`;
