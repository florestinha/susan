import gql from 'graphql-tag';

export default gql`
{
  countries {
    name
    code
  }
}
`;
