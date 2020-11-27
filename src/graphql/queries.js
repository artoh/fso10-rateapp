import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query {
    repositories { 
      edges {
        node {
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