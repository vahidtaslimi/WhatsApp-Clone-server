
import { User as MessageModuleUser } from '../../message/models/User';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Recipient } from './Recipient';

@Entity()
export class User extends MessageModuleUser {
  @OneToMany(type => Recipient, recipient => recipient.user)
  recipients: Recipient[];
}
