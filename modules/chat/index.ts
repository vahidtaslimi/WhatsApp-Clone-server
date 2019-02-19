import { GraphQLModule } from '@graphql-modules/core';
import { getObjectTypeFromClass, extractFieldResolversFromObjectType } from 'graphql-toolkit';
import { UserModule } from '../user';
import { ChatProvider } from './providers/chat.provider';
import { CommonModule } from '../common';
import { ProviderScope } from '@graphql-modules/di';
import { printType } from 'graphql';
import { Chat } from './models/Chat';
import { Query } from './models/Query';
import { Mutation } from './models/Mutation';
import { Subscription } from './models/Subscription';

export const ChatModule = new GraphQLModule({
  name: "Chat",
  imports: [
    CommonModule,
    UserModule,
  ],
  providers: [
    ChatProvider,
  ],
  defaultProviderScope: ProviderScope.Session,
  typeDefs: [
    printType(
      getObjectTypeFromClass(Chat)
    ),
    printType(
      getObjectTypeFromClass(Query)
    ),
    printType(
      getObjectTypeFromClass(Mutation)
    ),
    printType(
      getObjectTypeFromClass(Subscription)
    )
  ],
  resolvers: {
      Chat: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Chat)
      ),
      Query: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Query)
      ),
      Mutation: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Mutation)
      ),
      Subscription: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Subscription)
      )
    },
});
