import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order) => {
  console.log("Order in repositories",order);

  const orderVariables = order === "highest" ? {orderBy: "RATING_AVERAGE", orderDirection:"DESC"} :
    order === "lowest" ? { orderBy: "RATING_AVERAGE", orderDirection:"ASC"} : {orderBy: "CREATED_AT", orderDirection:"DESC"};

  const result = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network' , variables: orderVariables});  
  const repositories = result.loading ? null : result.data.repositories;    

  return repositories;
};

export default useRepositories;