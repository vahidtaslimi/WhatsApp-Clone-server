import { GraphQLModule } from '@graphql-modules/core';
import { loadResolversFiles, loadSchemaFiles, getObjectTypeFromClass, extractFieldResolversFromObjectType } from 'graphql-toolkit';
import { UserModule } from '../user';
import { MessageModule } from '../message';
import { ChatModule } from '../chat';
import { RecipientProvider } from './providers/recipient.provider';
import { CommonModule } from '../common';
import { printType } from 'graphql';
import { Chat } from './models/Chat';
import { Message } from './models/Message';
import { Recipient } from './models/Recipient';
import { Mutation } from './models/Mutation';

export const RecipientModule = new GraphQLModule({
  name: "Recipient",
  imports: [
    CommonModule,
    UserModule,
    ChatModule,
    MessageModule,
  ],
  providers: [
    RecipientProvider,
  ],
  typeDefs: [
    printType(
      getObjectTypeFromClass(Chat)
    ),
    printType(
      getObjectTypeFromClass(Message)
    ),
    printType(
      getObjectTypeFromClass(Recipient)
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
      Recipient: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Recipient)
      ),
      Mutation: extractFieldResolversFromObjectType(
        getObjectTypeFromClass(Mutation)
      )
    },
    ...loadResolversFiles(__dirname + '/resolvers/')
  ],
});
