import { GraphQLModule } from '@graphql-modules/core';
import { loadResolversFiles, loadSchemaFiles, ScalarType } from 'graphql-toolkit';
import { Connection } from 'typeorm';
import { PubSub } from 'apollo-server-express';
import { GraphQLDateTime } from 'graphql-iso-date';

export interface ICommonModuleConfig {
  connection: Connection,
}


ScalarType({
  ...GraphQLDateTime,
  name: 'Date'
})(Date);

export const CommonModule = new GraphQLModule<ICommonModuleConfig>({
  name: 'Common',
  providers: ({config: {connection}}) => [
    {provide: Connection, useValue: connection},
    PubSub,
  ],
  typeDefs: loadSchemaFiles(__dirname + '/schema/'),
  resolvers: loadResolversFiles(__dirname + '/resolvers/'),
  configRequired: true
});
