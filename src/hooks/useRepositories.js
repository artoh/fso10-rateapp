import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, search) => {
  console.log("Order in repositories",order);

  const orderVariables = order === "highest" ? {orderBy: "RATING_AVERAGE", orderDirection:"DESC"} :
    order === "lowest" ? { orderBy: "RATING_AVERAGE", orderDirection:"ASC"} : {orderBy: "CREATED_AT", orderDirection:"DESC"};

  const variables = {...orderVariables, search: search, first: 4};

  const {data, loading, fetchMore, ...result} = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network' , 
      variables: {...variables}
    });  
  
    const handleFetchMore  = () => {
        const canFetchMore = ! loading && data && data.repositories.pageInfo.hasNextPage;

        if( !canFetchMore ) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORIES,
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables
            },
            updateQuery: (previousResult, { fetchMoreResult}) => {
                const nextResult = {
                    repositories: {
                        ...fetchMoreResult.repositories,
                        edges: [
                            ...previousResult.repositories.edges,
                            ...fetchMoreResult.repositories.edges,
                        ],
                    },
                };
                return nextResult;
            },
            
        });

    };

  return {
      repositories: data ? data.repositories : undefined,
      fetchMore: handleFetchMore,
      loading,
      ...result,
  };
};

export default useRepositories;