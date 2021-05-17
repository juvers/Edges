import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLScalarType,
  GraphQLInt,
  GraphQLList,
  buildSchema
} from 'graphql';

// import getData from '../http';

const TextMatchHighlightType = new GraphQLObjectType({
  name: 'TextMatchHighlightQuery',
  fields: () => ({
    beginIndice: { type: GraphQLInt },
    endIndice: { type: GraphQLInt },
    text: { type: GraphQLString }
  })
});

const TextMatchType = new GraphQLObjectType({
  name: 'TextMatchQuery',
  fields: () => ({
    fragment: { type: GraphQLString },
    highlights: { type: [TextMatchHighlightType] },
    property: { type: GraphQLString }
  })
});

const SearchResultItemEdgeType = new GraphQLObjectType({
  name: 'SearchResultItemEdgeQuery',
  fields: () => ({
    cursor: { type: GraphQLString },
    node: { type: SearchResultItemEdgeType },
    textMatches: { type: TextMatchType }
  })
});

// Edge = [SearchResultItemEdge]

// Test case
const UserType = new GraphQLObjectType({
  name: 'UserQuery',
  fields: () => ({
    login: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    bio: { type: GraphQLString },
  })
});

const me = `{
  viewer{
    name
    login
    location
  }
}`


const TaskType = new GraphQLObjectType({
  name: 'TaskQuery',
  fields: () => ({
    login: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    bio: { type: GraphQLString },
  })
});


const SearchType = new GraphQLObjectType({
  name: 'SearchQuery',
  fields: () => ({
    search: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    viewer: {
      type: UserType,
      async resolve(parentValue, args) {
        // do stuff here
        // return await getData(me)

      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
})

// Logging as requested
graphql(schema, me).then(x => console.log(JSON.stringify(x)))
export default schema;
