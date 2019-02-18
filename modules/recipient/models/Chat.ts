import { Chat as MessageModuleChat } from '../../message/models/Chat';
import { Entity } from 'typeorm';
import { ObjectType, Field } from 'graphql-toolkit';
import { RecipientProvider } from '../providers/recipient.provider';
import { Inject } from '@graphql-modules/di';

@Entity()
@ObjectType({ injector: ({ injector }) => injector })
export class Chat extends MessageModuleChat {
    @Inject() recipientProvider: RecipientProvider;
    @Field(type => Number)
    unreadMessages() {
        return this.recipientProvider.getChatUnreadMessagesCount(this);
    }
}