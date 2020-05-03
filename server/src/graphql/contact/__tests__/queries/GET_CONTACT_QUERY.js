import gql from 'graphql-tag';

export default gql`
{
  contacts {
    name
    entityId
    main
    id
  }
}
`;
