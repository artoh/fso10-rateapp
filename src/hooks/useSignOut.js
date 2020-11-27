import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';
import { useContext } from 'react';

const useSignOut = () => {
    const client = useApolloClient();
    const authStorage = useContext(AuthStorageContext);

    const signOut = async () => {
        await authStorage.removeAccessToken();
        client.resetStore();
    }

    return signOut;
}

export default useSignOut;