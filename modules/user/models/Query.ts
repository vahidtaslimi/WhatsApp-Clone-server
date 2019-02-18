import { ObjectType, Inject, Field } from "graphql-toolkit";
import { UserProvider } from '../providers/user.provider';
import { User } from "./User";

@ObjectType({ injector: ({ injector }) => injector })
export class Query {
    @Inject() userProvider: UserProvider;
    
    @Field(type => [User])
    users() {
        return this.userProvider.getUsers();
    }
}