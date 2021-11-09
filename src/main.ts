import { createApp, h, provide } from "vue";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
  gql
} from "@apollo/client/core";
import { DefaultApolloClient, ApolloClients, useQuery, provideApolloClient,useResult } from "@vue/apollo-composable";
import App from "./App.vue";
const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzY3OTU4MTIsImlhdCI6MTYzNjQ1MDIxMiwic3ViIjoiNWViY2I5MWZhOTQ2ZTcwMDA3ZWFkNmFjIiwidW4iOiJ1c2VybmFtZSB0ZXN0In0.IPcXwciJLSfthngqGf_p8cEFWNiK9_-F2WSPT1JLuHRFMZh5utEvdZnGeRLh6e2RpCQ49xqXk5sFLa8nS9ZNiXmS7QFctDPQr_8ufwRTlauPpyQNzGrZYtSlGJ38eWgZ3bv653em4ETbq9Qkm9DZ6fKovwcNfjNcqWgOsoLIk7gIzJE5w9sA3LVHvHRxGEzH49iSUpABkRzCnrGYCZFWWS9fg69yGyeKcrWOVvDO63NYtSs4RGp4z5VIPLrVMF3qgBEuXIzdTc3Af3-aL5BdiOZPG70gAVsuPemBjv3BYD64AvQZvGswAtRzWJ-6Qm0lFIfuAgB7fj_BSRfYVnZLdA'

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }));
    return forward(operation);
  }),
  new HttpLink({ uri: "https://hxb-graph.hexabase.com/graphql" })
]);

const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache()
});


// const query = gql`
//   query {
//     workspaces {
//         workspaces {
//             workspace_name
//             workspace_id
//         }
//       }
//   }
// `

// apolloClient.query({
//   query
// })
//   .then(res => console.log(res))
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
});

app.mount("#app");