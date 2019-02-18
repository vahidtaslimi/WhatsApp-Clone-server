import { ObjectType, Inject, Field, Arg } from "graphql-toolkit";
import { UserProvider } from '../providers/user.provider';
import { User } from "./User";
import { UploadedFile } from "./UploadedFile";
import { GraphQLUpload } from "apollo-server-express";

@ObjectType({ injector: ({ injector }) => injector })
export class Mutation {
    @Inject() userProvider: UserProvider;
    
    @Field(type => User)
    updateUser(
        @Arg('name') name: string = '',
        @Arg('picture') picture: string = ''
    ) {
        return this.userProvider.updateUser({ name, picture });
    }

    @Field(type => UploadedFile)
    async uploadPicture(
        @Arg('file', { type: GraphQLUpload }) file$: any
    ) {
        const file = await file$;
        return this.userProvider.uploadProfilePic(file.createReadStream());
    }
}
