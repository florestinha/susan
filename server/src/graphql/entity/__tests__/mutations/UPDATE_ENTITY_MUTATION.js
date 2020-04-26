import gql from 'graphql-tag';

export default gql`
mutation UpdateEntity( $input: UpdateEntityInput! ) {
  updateEntity ( input: $input ) {
    entity {
      name
      description
      address
      addressComplement
      city
      region
      postCode
      longitude
      latitude
      entityTypeId
      countryCode
    }
  }
}
`;
