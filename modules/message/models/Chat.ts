import { Chat as ChatModuleChat, ChatConstructor as ChatModuleChatConstructor } from '../../chat/models/Chat';
import { Entity, OneToMany } from 'typeorm';
import { ObjectType, Field, Arg } from 'graphql-toolkit';
import { Message } from './Message';
import { Inject } from '@graphql-modules/di';
import { MessageProvider } from '../providers/message.provider';

export interface ChatConstructor extends ChatModuleChatConstructor {
    messages?: Message[];
  }
  
@Entity()
@ObjectType({ injector: ({ injector }) => injector })
export class Chat extends ChatModuleChat {

    @Inject() messageProvider: MessageProvider;

    constructor({ messages, ...rest }: ChatConstructor = {}) {
        super(rest);
        if (messages) {
            this.messages = messages;
        }
    }

    @OneToMany(type => Message, message => message.chat, { cascade: ["insert", "update"], eager: true })
    messages: Message[];

    @Field(type => [Message], { name: 'messages' })
    resolveMessages(@Arg('amount') amount: number) {
        return this.messageProvider.getChatMessages(this, amount || 0)
    }

    @Field(type => Message)
    lastMessage() {
        return this.messageProvider.getChatLastMessage(this);
    }

    @Field(type => Date)
    updatedAt() {
        return this.messageProvider.getChatUpdatedAt(this);
    }

}