import { Entity, Column } from 'typeorm';
import { User as AccountsUser } from '@accounts/typeorm';
import { Field, ObjectType, InputObjectType, InputField } from 'graphql-toolkit';

@ObjectType()
@InputObjectType({ name: 'CreateUserInput' })
@Entity()
export class User extends AccountsUser{

  @Column({nullable: true})
  @Field()
  @InputField()
  name: string;

  @Column({nullable: true})
  @Field()
  @InputField()
  picture: string;

  @Column({nullable: true})
  @Field()
  @InputField()
  phone?: string;
}
