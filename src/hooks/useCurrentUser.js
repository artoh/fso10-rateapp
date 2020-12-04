import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../graphql/queries';

const useCurrentUser = (includeReviews) => {
    const { loading, data, refetch } = useQuery( GET_USER, {variables: {includeReviews: (includeReviews === true ? true : false)}} );
    
    return loading || !data ? null : { data: data.authorizedUser, refetch };
};

export default useCurrentUser;