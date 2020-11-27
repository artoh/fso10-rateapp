import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
    const client = useApolloClient();    
    const authStorage = useContext(AuthStorageContext);
    
    const [mutate, result] = useMutation(AUTHORIZE, {
        onError: (error) => {console.log(error.graphQLErrors[0].message);},
    });

    const signIn = async ({username, password}) => {
        const { data } = await mutate({variables: {username, password}});                
        await authStorage.setAccessToken(data.authorize.accessToken);        
        client.resetStore();
    };

    return [signIn, result];
};

export default useSignIn;