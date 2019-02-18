import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn
} from 'typeorm';
import { Chat } from './Chat';
import { User } from './User';
import { MessageType } from '../../../db';
import { Field, Inject, ObjectType } from 'graphql-toolkit';
import { MessageProvider } from '../providers/message.provider';

export interface MessageConstructor {
  sender?: User;
  content?: string;
  createdAt?: Date,
  type?: MessageType;
  holders?: User[];
  chat?: Chat;
}

@Entity()
@ObjectType({ injector: ({ injector }) => injector })
export class Message {

  @Inject() messageProvider: MessageProvider;

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(type => User, user => user.senderMessages, {eager: true})
  @Field(type => User)
  sender: User;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn({nullable: true})
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  type: number;

  @ManyToMany(type => User, user => user.holderMessages, {cascade: ["insert", "update"], eager: true})
  @JoinTable()
  @Field(type => [User])
  holders: User[];

  @ManyToOne(type => Chat, chat => chat.messages, { lazy: true })
  @Field(type => Chat)
  chat: Promise<Chat>;

  @Field(type => User)
  ownership() {
    return this.messageProvider.getMessageOwnership(this);
  }

  constructor({sender, content, createdAt, type, holders, chat}: MessageConstructor = {}) {
    if (sender) {
      this.sender = sender;
    }
    if (content) {
      this.content = content;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (type) {
      this.type = type;
    }
    if (holders) {
      this.holders = holders;
    }
    if (chat) {
      this.chat = Promise.resolve(chat);
    }
  }
}
