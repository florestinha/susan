import gql from 'graphql-tag';

export default gql`
{
  contactItems {
    id
    contact
    contactTypeId
    contactId
  }
}
`;
