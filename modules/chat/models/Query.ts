import { ObjectType, Field, Arg } from 'graphql-toolkit';
import { Inject } from '@graphql-modules/di';
import { ChatProvider } from '../providers/chat.provider';;
import { Chat } from "./Chat";

@ObjectType({ injector: ({ injector }) => injector })
export class Query {
    @Inject() chatProvider: ChatProvider;
    @Field(type => [Chat])
    chats() {
        return this.chatProvider.getChats();
    }
    @Field(type => Chat)
    chat(@Arg('chatId') chatId: string) {
        return this.chatProvider.getChat(chatId);
    }
}
