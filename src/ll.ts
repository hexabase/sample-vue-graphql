import { createApp, provide, h } from 'vue';
import App from './App.vue'
import { ApolloClient, InMemoryCache, gql,
  ApolloLink,
  from,
  HttpLink, } from '@apollo/client';
import { DefaultApolloClient, ApolloClients,useQuery, useResult } from '@vue/apollo-composable'
// import { ApolloClients } from "@vue/apollo-composable";
// HTTP connection to the API
// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri: 'http://localhost:3020/graphql',
// })
// const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzY3NzMwNDMsImlhdCI6MTYzNjQyNzQ0Mywic3ViIjoiNWViY2I5MWZhOTQ2ZTcwMDA3ZWFkNmFjIiwidW4iOiJ1c2VybmFtZSB0ZXN0In0.kU8WYBpirlu5XKIiSd_i4OJH_kNN1d3ivLr8mO93X89o7KDWWp0Lv6Fg3QjdPzq6I8a1-MqnnDVJim8QilGQ4tTS0C3iIl8OXL1vckFltIT5lBb0UhzxqV7WciqeLrG9dOCpmGSx9UJP3mzUuljwjjaVhEJns6u9E0X2Is8PPmTu9XBqIZVF9i0WXBtTQT7leVGhhVXiODt5e_yrr2ck0qlS1b1uNnuU0iQwzrp8PTzwxvR_up6FD3Z4gkk_T4S3aLCrbywgKtGzpxYi2I0u1gfxcjAYMKF63MGvqK5Va4aJRbF1p05neL2EIFNGzQ6TCmFlJ0ODONhl4MBcmi5aeg'
// const defaultClient  = new ApolloClient({
//   uri: 'https://hxb-graph.hexabase.com/graphql',
//   cache: new InMemoryCache()
// });

// // Cache implementation
// const cache = new InMemoryCache()

// // Create the apollo client
// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// })
// const apolloProvider = new VueApollo({
//     defaultClient: apolloClient,
//   })

const QUERY = gql`
  query Query {
    workspaces {
        workspaces {
            workspace_name
            workspace_id
        }
    }
}`;
const { result, loading, error } = useQuery(QUERY);

console.log(result, loading, error )
const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: { headers: any }) => ({
      headers: {
        ...headers,
        authorization: `Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzY3NzMwNDMsImlhdCI6MTYzNjQyNzQ0Mywic3ViIjoiNWViY2I5MWZhOTQ2ZTcwMDA3ZWFkNmFjIiwidW4iOiJ1c2VybmFtZSB0ZXN0In0.kU8WYBpirlu5XKIiSd_i4OJH_kNN1d3ivLr8mO93X89o7KDWWp0Lv6Fg3QjdPzq6I8a1-MqnnDVJim8QilGQ4tTS0C3iIl8OXL1vckFltIT5lBb0UhzxqV7WciqeLrG9dOCpmGSx9UJP3mzUuljwjjaVhEJns6u9E0X2Is8PPmTu9XBqIZVF9i0WXBtTQT7leVGhhVXiODt5e_yrr2ck0qlS1b1uNnuU0iQwzrp8PTzwxvR_up6FD3Z4gkk_T4S3aLCrbywgKtGzpxYi2I0u1gfxcjAYMKF63MGvqK5Va4aJRbF1p05neL2EIFNGzQ6TCmFlJ0ODONhl4MBcmi5aeg`,
      },
    }));
    return forward(operation); // Go to the next link in the chain. Similar to `next` in Express.js middleware.
  }),
  new HttpLink({ uri: "https://hxb-graph.hexabase.com/graphql" }),
]);

const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});
const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
    render: () => h(App)
});
app.mount('#app')
