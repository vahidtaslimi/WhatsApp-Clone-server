import { ObjectType, Field } from "graphql-toolkit";
import { Message as MessageModuleMessage, MessageConstructor as MessageModuleMessageConstructor } from '../../message/models/Message';
import { Entity, OneToMany } from "typeorm";
import { Recipient } from "./Recipient";

export interface MessageConstructor extends MessageModuleMessageConstructor {
  recipients?: Recipient[];
}

@Entity()
@ObjectType({ injector: ({ injector }) => injector })
export class Message extends MessageModuleMessage {
    constructor({ recipients, ...rest }: MessageConstructor = {}) {
      super(rest);
      if (recipients) {
        recipients.forEach(recipient => recipient.message = Promise.resolve(this));
        this.recipients = recipients;
      }
    }
    @OneToMany(type => Recipient, recipient => recipient.message, {cascade: ["insert", "update"], eager: true})
    @Field(type => [Recipient])
    recipients: Recipient[];
}