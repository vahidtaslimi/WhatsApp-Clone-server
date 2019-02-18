import { ObjectType, Field, Arg } from "graphql-toolkit";
import { Inject } from "@graphql-modules/di";
import { RecipientProvider } from '../providers/recipient.provider';
import { Message } from "./Message";

@ObjectType({ injector: ({ injector }) => injector })
export class Mutation {
    @Inject() recipientProvider: RecipientProvider;
    @Field()
    markAsReceived: boolean = false;

    @Field()
    markAsRead: boolean = false;

    @Field(type => String)
    removeChat(
        @Arg('chatId') chatId: string
    ){
        return this.recipientProvider.removeChat(chatId);
    }

    @Field(type => Message)
    addMessage(
        @Arg('chatId') chatId: string,
        @Arg('content') content: string,
    ){
        return this.recipientProvider.addMessage(chatId, content);
    }

    @Field(type => [String])
    removeMessages(
        @Arg('chatId') chatId: string,
        @Arg('messageIds', { type: [String] }) messageIds?: string[],
        @Arg('all') all?: boolean
    ){
        this.recipientProvider.removeMessages(chatId, { messageIds, all });
    }
    
}