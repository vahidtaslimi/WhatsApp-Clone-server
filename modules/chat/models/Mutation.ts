import { ObjectType, Field, Arg, Inject } from "graphql-toolkit";
import { ChatProvider } from "../providers/chat.provider";
import { Chat } from "./Chat";
import { User } from "../../user/models/User";

@ObjectType({ injector: ({ injector }) => injector })
export class Mutation {
    @Inject() chatProvider: ChatProvider;
    @Field(type => Chat)
    addChat(@Arg('userId') userId: string) {
        return this.chatProvider.addChat(userId);
    }
    @Field(type => Chat)
    addGroup(
        @Arg('userIds', { type: [String] }) userIds: string[],
        @Arg('groupName') groupName: string = '',
        @Arg('groupPicture') groupPicture: string = '' 
    ) {
        return this.chatProvider.addGroup(userIds, { groupName, groupPicture });
    }
    @Field(type => Chat)
    updateChat(
        @Arg('chatId') chatId: string,
        @Arg('name') name: string = '',
        @Arg('picture') picture: string = ''
    ){
        return this.chatProvider.updateChat(chatId, { name, picture });
    }
    @Field(type => String)
    removeChat(@Arg('chatId') chatId: string) {
        return this.chatProvider.removeChat(chatId);
    }
    @Field(type => User)
    updateUser(
        @Arg('name') name: string = '',
        @Arg('picture') picture: string = ''
    ) {
        return this.chatProvider.updateUser({ name, picture });
    }
}