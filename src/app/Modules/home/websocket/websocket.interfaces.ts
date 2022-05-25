import { AccountUser } from '../../account/account.model';

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
