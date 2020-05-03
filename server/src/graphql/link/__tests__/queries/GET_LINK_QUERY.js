import gql from 'graphql-tag';

export default gql`
{
  links {
    id
    link
    main
    entityId
    linkTypeId
  }
}
`;
