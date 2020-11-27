import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../graphql/queries';

const useCurrentUser = () => {
    const result = useQuery( GET_USER );
    
    return result.loading ? null : result.data.authorizedUser;
};

export default useCurrentUser;