import { createYoga } from "graphql-yoga";
import { schema } from "../../../graphql/schema";

const { handleRequest } = createYoga({
    schema,

    // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
    graphqlEndpoint: "/api/graphql",

    // Yoga needs to know how to create a valid response
    fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS };
