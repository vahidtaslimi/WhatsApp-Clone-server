
import { User as ChatModuleUser } from '../../chat/models/User';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Message } from './Message';

@Entity()
export class User extends ChatModuleUser {
    
  @ManyToMany(type => Message, message => message.holders)
  holderMessages: Message[];

  @OneToMany(type => Message, message => message.sender)
  senderMessages: Message[];

}