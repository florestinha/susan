import gql from 'graphql-tag';

export default gql`
{
  entities {
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
`;
