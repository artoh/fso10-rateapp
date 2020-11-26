import ApolloClient from 'apollo-boost';

const createApolloClient = () => {
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
    uri: 'http://10.0.2.15:5000/graphql',
  });
};

export default createApolloClient;