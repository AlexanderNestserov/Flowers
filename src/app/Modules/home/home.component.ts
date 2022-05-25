import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import moment from 'moment';
import { Observable } from 'rxjs';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { AccountUser } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { WS } from './websocket/websocket.events';
import { Message, MessagesWS } from './websocket/websocket.interfaces';
import { WebsocketService } from './websocket/websocket.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Client } from 'stompjs';

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private stompClient!: Client;
  greetings: string[] = [];
  chatId: number = 0;
  userId: number = 0;
  criticalSize: number = 670;
  messages: Message[] = [];
  user: AccountUser = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    homeAddress: '',
    additionalInformation: '',
    shippingAddress: '',
  };
  sendMessage: MessagesWS = {
    id: 0,
    messages: [],
    user: this.user,
  };
  message: Message = {
    date: '',
    id: 0,
    message: '',
    sender: this.user,
  };
  isChartShow = false;
  inputMessage: string = '';
  form: FormGroup = this.formbuilder.group({
    text: ['', [Validators.maxLength(255)]],
  });

  constructor(
    private formbuilder: FormBuilder,
    public wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.wsService.getChat().subscribe((res: MessagesWS) => {
      this.chatId = res.id;
      this.user = res.user;
      this.userId = res.user.id;
    });
    this.connect();
  }

  get text() {
    return this.form.get('text') as FormControl;
  }

  connect() {
    const socket = new SockJS('http://172.16.16.41:15000/ws');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (res) {
      // _this.setConnected(true);
      _this.stompClient.subscribe(
        `/topic/chat/${_this.chatId}/messages`,
        function (hello) {
          _this.showGreeting(JSON.stringify(hello.body));
        }
      );
    });
  }
  disconnect() {
    if (this.stompClient != null) {
      const _this = this;
      this.stompClient.disconnect(function () {
        // _this.setConnected(false);
      });
    }
  }
  /* setConnected(connected: boolean) {
    if (connected) {
      this.greetings = [];
    }
  }*/

  showGreeting(message: string) {
    this.greetings.push(message);
  }

  chartShow(): void {
    this.isChartShow = !this.isChartShow;
    if (window.innerWidth < this.criticalSize) {
      if (!this.isChartShow) {
        document.body.style.overflow = 'scroll';
      } else {
        document.body.style.overflow = 'hidden';
      }
    }
  }
  closeChart(): void {
    this.isChartShow = false;
    document.body.style.overflow = 'scroll';
  }

  public sendText(): void {
    this.message.date = moment().format('DD.MM.YY.HH.mm.ss');
    this.message.message = this.form.value.text;
    this.message.sender = this.user;
    this.message.id;
    this.sendMessage.messages.push(this.message);
    this.sendMessage.user = this.user;

    this.stompClient.send('/app/message', {}, JSON.stringify(this.message));
    this.wsService.getChat().subscribe((res: MessagesWS) => {
      console.log(res.messages);
    });

    this.form.reset();
  }
  ngOnDestroy(): void {
    this.disconnect();
  }
}
