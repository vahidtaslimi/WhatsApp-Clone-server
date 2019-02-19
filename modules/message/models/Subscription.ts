import { Field, ObjectType } from "graphql-toolkit";
import { Inject } from '@graphql-modules/di';
import { Message } from './Message';
import { PubSub } from 'apollo-server-express';
import { MessageProvider } from '../providers/message.provider';

@ObjectType()
export class Subscription {
    @Inject() messageProvider: MessageProvider;
    @Inject() pubSub: PubSub;
    @Field(type => Message, {
        subscribe: true,
        filter(this: Subscription, data: { messageAdded: Message }) {
            return data && this.messageProvider.filterMessageAdded(data.messageAdded)
        }
    })
    messageAdded() {
        return this.pubSub.asyncIterator('messageAdded');
    }
}