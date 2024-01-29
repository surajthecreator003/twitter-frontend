//the config file for graphql-codegen
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",//get the schema from the Graphql Server
  documents: "**/*.{tsx,ts}",//basically all the typescript files in the directory
 //should change this to specific graphql types file

  generates: {
    "gql/": {
      preset: "client",//putting all the generated types from backend to this folder
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;

