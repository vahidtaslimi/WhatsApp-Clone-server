import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from './User';
import { ObjectType, Field } from "graphql-toolkit";

export interface ChatConstructor {
  name?: string;
  picture?: string;
  allTimeMembers?: User[];
  listingMembers?: User[];
  actualGroupMembers?: User[];
  admins?: User[];
  owner?: User;
}

@Entity()
@ObjectType()
export class Chat {

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @CreateDateColumn({nullable: true})
  @Field()
  createdAt: Date;

  @Column({nullable: true})
  @Field()
  name: string;

  @Column({nullable: true})
  @Field()
  picture: string;

  @ManyToMany(type => User, user => user.allTimeMemberChats, {cascade: ["insert", "update"], eager: false, lazy: true})
  @JoinTable()
  @Field(type => [User])
  allTimeMembers: Promise<User[]>;

  @ManyToMany(type => User, user => user.listingMemberChats, {cascade: ["insert", "update"], eager: false, lazy: true})
  @JoinTable()
  @Field(type => [User])
  listingMembers: Promise<User[]>;

  @ManyToMany(type => User, user => user.actualGroupMemberChats, {cascade: ["insert", "update"], eager: false, lazy: true})
  @JoinTable()
  @Field(type => [User])
  actualGroupMembers?: Promise<User[]>;

  @ManyToMany(type => User, user => user.adminChats, {cascade: ["insert", "update"], eager: false, lazy: true})
  @JoinTable()
  @Field(type => [User])
  admins?: Promise<User[]>;

  @ManyToOne(type => User, user => user.ownerChats, {cascade: ["insert", "update"], eager: false, lazy: true})
  @Field(type => User)
  owner?: Promise<User | null>;

  @Field()
  isGroup(): boolean {
    return !!this.name;
  }

  constructor({name, picture, allTimeMembers, listingMembers, actualGroupMembers, admins, owner }: ChatConstructor = {}) {
    if (name) {
      this.name = name;
    }
    if (picture) {
      this.picture = picture;
    }
    if (allTimeMembers) {
      this.allTimeMembers = Promise.resolve(allTimeMembers);
    }
    if (listingMembers) {
      this.listingMembers = Promise.resolve(listingMembers);
    }
    if (actualGroupMembers) {
      this.actualGroupMembers = Promise.resolve(actualGroupMembers);
    }
    if (admins) {
      this.admins = Promise.resolve(admins);
    }
    if (owner) {
      this.owner = Promise.resolve(owner);
    }
  }
}
