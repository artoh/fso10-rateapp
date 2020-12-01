import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {

  const result = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network' });  
  const repositories = result.loading ? null : result.data.repositories;  
  const loading = result.loading;

  return { repositories, loading };
};

export default useRepositories;