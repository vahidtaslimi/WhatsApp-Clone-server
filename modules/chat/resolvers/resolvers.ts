import { PubSub, withFilter } from 'apollo-server-express';
import { Chat } from '../models/Chat';
import { ChatProvider } from '../providers/chat.provider';
import { ModuleContext } from '@graphql-modules/core';

export const Subscription = {
  chatAdded: {
    subscribe: withFilter((root, args, { injector }: ModuleContext) => injector.get(PubSub).asyncIterator('chatAdded'),
      (data: { chatAdded: Chat, creatorId: number }, variables, { injector }: ModuleContext) =>
        data && injector.get(ChatProvider).filterChatAddedOrUpdated(data.chatAdded, data.creatorId)
    ),
  },
  chatUpdated: {
    subscribe: withFilter((root, args, { injector }: ModuleContext) => injector.get(PubSub).asyncIterator('chatUpdated'),
      (data: { chatUpdated: Chat, updaterId: number }, variables, { injector }: ModuleContext) =>
        data && injector.get(ChatProvider).filterChatAddedOrUpdated(data.chatUpdated, data.updaterId)
    ),
  },
}

