import { ObjectType, Field, Arg } from "graphql-toolkit";
import { MessageProvider } from "../providers/message.provider";
import { Message } from "./Message";
import { Inject } from "@graphql-modules/di";

@ObjectType({ injector: ({ injector }) => injector })
export class Mutation {
    @Inject() messageProvider: MessageProvider;
    
    @Field(type => Message)
    addMessage(
        @Arg('chatId') chatId: string, 
        @Arg('content') content: string
    ) {
        return this.messageProvider.addMessage(chatId, content);
    }

    @Field(type => [String])
    removeMessages(
        @Arg('chatId') chatId: string,
        @Arg('messageIds', { type: [String] }) messageIds?: string[],
        @Arg('all') all?: boolean
    ){
        return this.messageProvider.removeMessages(chatId, {
            messageIds,
            all
        });
    }
    
    @Field(type => String)
    removeChat(
        @Arg('chatId') chatId: string, 
    ){
        return this.messageProvider.removeChat(chatId);
    }
}