import gql from 'graphql-tag';

export default gql`
mutation CreateEntity( $input: CreateEntityInput! ) {
  createEntity ( input: $input ) {
    entity {
      name
      id
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
