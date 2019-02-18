import { PubSub } from 'apollo-server-express';
import { withFilter } from 'apollo-server-express';
import { Message } from '../models/Message';
import { MessageProvider } from '../providers/message.provider';
import { ModuleContext } from '@graphql-modules/core';

export default {
  Subscription: {
    messageAdded: {
      subscribe: withFilter((root, args, { injector }: ModuleContext) => injector.get(PubSub).asyncIterator('messageAdded'),
        (data: { messageAdded: Message }, variables, { injector }: ModuleContext) => data && injector.get(MessageProvider).filterMessageAdded(data.messageAdded)
      ),
    },
  },
};
