const { GraphQLClient } = require('graphql-request')
const config = require('config')

exports.fuseswapClient = new GraphQLClient(config.get('graph.fuseswapUrl'))
