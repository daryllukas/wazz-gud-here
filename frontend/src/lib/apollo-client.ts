import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_STRAPI_API_BASE}/graphql`,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    }
});

export default client;