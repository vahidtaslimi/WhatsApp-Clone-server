import { Entity, ManyToMany, OneToMany } from "typeorm";

import { Chat } from "./Chat";

import { User as UserModuleUser } from '../../user/models/User';
import { ObjectType } from "graphql-toolkit";

@Entity()
@ObjectType()
export class User extends UserModuleUser {
  @ManyToMany(type => Chat, chat => chat.allTimeMembers)
  allTimeMemberChats: Chat[];

  @ManyToMany(type => Chat, chat => chat.listingMembers)
  listingMemberChats: Chat[];

  @ManyToMany(type => Chat, chat => chat.actualGroupMembers)
  actualGroupMemberChats: Chat[];

  @ManyToMany(type => Chat, chat => chat.admins)
  adminChats: Chat[];

  @OneToMany(type => Chat, chat => chat.owner)
  ownerChats: Chat[];
}