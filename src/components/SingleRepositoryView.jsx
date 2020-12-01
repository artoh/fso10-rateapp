import React from 'react';
import { useParams } from 'react-router-dom';
import useRepository from '../hooks/useRepository';

import RepositoryItem from './RepositoryItem'

const SingleRepositoryView = () => {
    const { id } = useParams();
    const { repository, loading } = useRepository(id);

    if(loading)
        return (<div/>);

    return (
        <RepositoryItem item={repository}/>
    );

};

export default SingleRepositoryView;