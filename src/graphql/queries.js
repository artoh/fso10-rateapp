import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query getRepositories(
    $orderDirection: OrderDirection,
    $orderBy: AllRepositoriesOrderBy,
    $search: String
) {
    repositories(
        orderBy: $orderBy,
        orderDirection: $orderDirection,
        searchKeyword:  $search
    ) { 
      edges {
        node {
          id 
          fullName
          description
          language
          ratingAverage
          reviewCount
          forksCount
          ownerAvatarUrl
          stargazersCount
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
query getRepository($id: ID!) {
    repository (id: $id) {
          id 
          fullName
          description
          language
          ratingAverage
          reviewCount
          url
          forksCount   
          ownerAvatarUrl
          stargazersCount
          reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
          }
        }
    }
  }
  `;

export const GET_USER = gql `
query {
    authorizedUser {
        id
        username
    }
}
`;