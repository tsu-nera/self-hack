import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";

const API_URL_LOCAL =
  "http://localhost:5000/titan-dev-1234/asia-northeast1/api";
const API_URL_REMOTE =
  "https://asia-northeast1-titan-dev-1234.cloudfunctions.net/api";

const client = new ApolloClient({
  link: createHttpLink({
    uri: API_URL_LOCAL,
    fetch
  }),
  cache: new InMemoryCache()
});

export default client;