const { initializeApollo } = require("./apolloClient");


const getInitialServerSideState = (ctx) => {
  const apolloClient = initializeApollo(null, ctx);

  return {
    initialApolloState: apolloClient.cache.extract(),
  }
}

export default getInitialServerSideState;
