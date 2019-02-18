import { GraphQLModule } from '@graphql-modules/core';
import { loadResolversFiles, loadSchemaFiles, getObjectTypeFromClass, extractFieldResolversFromObjectType } from 'graphql-toolkit';
import { UserModule } from '../user';
import { ChatModule } from '../chat';
import { MessageProvider } from './providers/message.provider';
import { CommonModule } from '../common';
import { ProviderScope } from '@graphql-modules/di';
import { printType } from 'graphql';
import { Chat } from './models/Chat';
import { Message } from './models/Message';
import { Query } from './models/Query';
import { Mutation } from './models/Mutation';

export const MessageModule = new GraphQLModule({
  name: "Message",
  imports: [
    CommonModule,
    UserModule,
    ChatModule,
  ],
  providers: [
    MessageProvider,
  ],
  defaultProviderScope: ProviderScope.Session,
  typeDefs: [
    printType(
      getObjectTypeFromClass(Chat)
    ),
    printType(
      getObjectTypeFromClass(Message)
    ),
    printType(
      getObjectTypeFromClass(Query)
    ),
    printType(
      getObjectTypeFromClass(Mutation)
    ),
    ...loadSchemaFiles(__dirname + '/schema/')
  ],
  resolvers: [
    {
      Chat: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Chat)
      ),
      Message: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Message)
      ),
      Query: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Query)
      ),
      Mutation: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Mutation)
      )
    },
    ...loadResolversFiles(__dirname + '/resolvers/')
  ],
});
