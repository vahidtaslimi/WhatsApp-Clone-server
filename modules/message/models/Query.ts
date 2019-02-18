import { ObjectType, Field } from 'graphql-toolkit';
import { Chat } from './Chat';
import { Inject } from '@graphql-modules/di';
import { MessageProvider } from '../providers/message.provider';

@ObjectType({ injector: ({ injector }) => injector })
export class Query {
    @Inject() messageProvider: MessageProvider;

    @Field(type => [Chat])
    chats() {
        return this.messageProvider.getChats(); 
    }
}