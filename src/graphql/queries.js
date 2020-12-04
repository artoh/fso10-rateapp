import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query getRepositories(
    $orderDirection: OrderDirection,
    $orderBy: AllRepositoriesOrderBy,
    $search: String,
    $after: String,
    $first: Int
) {
    repositories(
        orderBy: $orderBy,
        orderDirection: $orderDirection,
        searchKeyword:  $search,
        first: $first,
        after: $after
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
        cursor      
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
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
query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
        id
        username
        reviews @include(if: $includeReviews) {
            edges {
                node {
                  id
                    repository {
                        fullName
                        url
                    }          
                  rating
                  createdAt
                  text                  
              }
            }
        }
    }
}
`;