import { Field, ObjectType } from "graphql-toolkit";

@ObjectType()
export class UploadedFile {
    @Field() url: string;
}