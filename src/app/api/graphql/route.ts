import { createYoga } from "graphql-yoga";
import { schema } from "../../../graphql/schema";

const { handleRequest } = createYoga({
    schema,
    graphqlEndpoint: "/api/graphql",
    fetchAPI: { Response },
});

export async function GET(request: Request) {
    return handleRequest(request, {});
}

export async function POST(request: Request) {
    return handleRequest(request, {});
}

export async function OPTIONS(request: Request) {
    return handleRequest(request, {});
}
