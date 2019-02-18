import { PubSub, GraphQLUpload } from 'apollo-server-express';
import { withFilter } from 'apollo-server-express';
import { UserProvider } from '../providers/user.provider';
import { User } from '../models/User';
import { ModuleContext } from '@graphql-modules/core';

export const Upload = GraphQLUpload;
export const Subscription = {
  userAdded: {
    subscribe: withFilter(
      (root, args, { injector }: ModuleContext) => injector.get(PubSub).asyncIterator('userAdded'),
      (data: { userAdded: User }, variables, { injector }: ModuleContext) => data && injector.get(UserProvider).filterUserAddedOrUpdated(data.userAdded),
    ),
  },
  userUpdated: {
    subscribe: withFilter(
      (root, args, { injector }: ModuleContext) => injector.get(PubSub).asyncIterator('userAdded'),
      (data: { userUpdated: User }, variables, { injector }: ModuleContext) => data && injector.get(UserProvider).filterUserAddedOrUpdated(data.userUpdated)
    ),
  },
}
