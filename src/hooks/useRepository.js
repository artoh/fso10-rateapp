import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY} from '../graphql/queries';

const useRepository = (id) => {
    const {loading, data} = useQuery(GET_REPOSITORY, {variables:{"id":id}, fetchPolicy: 'cache-and-network'});
    const repository = loading ? null : data.repository;
    
    return { repository, loading};
};

export default useRepository;