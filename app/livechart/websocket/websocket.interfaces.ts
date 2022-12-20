import { AccountUser } from '../../Modules/account/account.model';

export interface MessagesWS {
  id: number;
  messages: Message[];
  user: AccountUser;
}

export interface Message {
  date: string;
  id: number;
  message: string;
  sender: AccountUser;
}

export interface SendMessage {
  sender: { id: number };
  message: string;
  chatRoom: { id: number };
}
