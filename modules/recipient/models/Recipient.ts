import { Entity, ManyToOne, Column } from 'typeorm';
import { Message } from './Message';
import { User } from './User';
import { Inject } from '@graphql-modules/di';
import { Field, ObjectType } from 'graphql-toolkit';
import { Chat } from './Chat';
import { RecipientProvider } from '../providers/recipient.provider';

interface RecipientConstructor {
  user?: User;
  message?: Message;
  receivedAt?: Date;
  readAt?: Date;
}

@ObjectType()
@Entity()
export class Recipient {
  @Inject() recipientProvider: RecipientProvider;

  @Field(type => User)
  @ManyToOne(type => User, user => user.recipients, { primary: true, lazy: true })
  user: Promise<User>;

  @Field(type => Message)
  @ManyToOne(type => Message, message => message.recipients, { primary: true, lazy: true })
  message: Promise<Message>;

  @Field(type => Date)
  @Column({nullable: true})
  receivedAt: Date;

  @Field(type => Date)
  @Column({nullable: true})
  readAt: Date;

  @Field(type => Chat)
  chat() {
    return this.recipientProvider.getRecipientChat(this);
  }

  constructor({user, message, receivedAt, readAt}: RecipientConstructor = {}) {
    if (user) {
      this.user = Promise.resolve(user);
    }
    if (message) {
      this.message = Promise.resolve(message);
    }
    if (receivedAt) {
      this.receivedAt = receivedAt;
    }
    if (readAt) {
      this.readAt = readAt;
    }
  }
}
