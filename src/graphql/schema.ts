import { createSchema } from "graphql-yoga";
import { prisma } from "../lib/prisma";

const typeDefs = /* GraphQL */ `
  type Project {
    id: ID!
    title: String
    desc: String
    tags: String
    images: String
    location: String
    time: String
    reference_url: String
    files: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    sex: String
    first_name: String
    last_name: String
    avatar: String
  }

  type Query {
    projects: [Project!]!
    projectById(id: ID!): Project
    users: [User!]!
    userById(id: ID!): User
  }

  type Mutation {
    createProject(
      id: ID!
      title: String!
      desc: String
      tags: String
      images: String
      location: String
      time: String
      reference_url: String
      files: String
    ): Project!

    deleteProject(id: ID!): Project
  }
`;

const resolvers = {
    Query: {
        projects: async () => {
            return await prisma.project.findMany();
        },
        projectById: async (_: unknown, { id }: { id: string }) => {
            return await prisma.project.findUnique({
                where: { id },
            });
        },
        users: async () => {
            return await prisma.user.findMany();
        },
        userById: async (_: unknown, { id }: { id: string }) => {
            return await prisma.user.findUnique({
                where: { id },
            });
        },
    },
    Mutation: {
        createProject: async (_: unknown, args: Record<string, unknown>) => {
            return await prisma.project.create({
                data: {
                    id: args.id,
                    title: args.title,
                    desc: args.desc,
                    tags: args.tags,
                    images: args.images,
                    location: args.location,
                    time: args.time,
                    reference_url: args.reference_url,
                    files: args.files,
                },
            });
        },
        deleteProject: async (_: unknown, { id }: { id: string }) => {
            return await prisma.project.delete({
                where: { id },
            });
        },
    },
};

export const schema = createSchema({
    typeDefs,
    resolvers,
});
