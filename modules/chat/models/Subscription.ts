import { ObjectType, Field } from "graphql-toolkit";
import { Inject } from '@graphql-modules/di';
import { Chat } from './Chat';
import { ChatProvider } from '../providers/chat.provider';

import { PubSub } from 'apollo-server-express';

@ObjectType({ injector: ({ injector }) => injector })
export class Subscription {
  @Inject() chatProvider: ChatProvider;
  @Inject() pubSub: PubSub;

  @Field(type => Chat, {
      subscribe: true,
      filter(this: Subscription, data: { chatAdded: Chat, creatorId: number }){
        return this.chatProvider.filterChatAddedOrUpdated(data.chatAdded, data.creatorId);
      }
  })
  chatAdded() {
      return this.pubSub.asyncIterator('chatAdded');
  }

  @Field(type => Chat, {
      subscribe: true,
      filter(this: Subscription, data: { chatUpdated: Chat, updaterId: number }) {
        data && this.chatProvider.filterChatAddedOrUpdated(data.chatUpdated, data.updaterId)
      }
  })
  chatUpdated() {
    return this.pubSub.asyncIterator('chatUpdated')
  }
}