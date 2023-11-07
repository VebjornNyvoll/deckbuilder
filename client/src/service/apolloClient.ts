import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:1001/Hearthstone"
});

const authLink = setContext((_, { header }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("token") || ""
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;