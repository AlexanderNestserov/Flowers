import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Message, MessagesWS } from './websocket/websocket.interfaces';
import { WebsocketService } from './websocket/websocket.service';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveChatComponent implements OnInit {
  greetings: string[] = [];
  chatId: number = 0;
  userId: number = 0;
  criticalSize: number = 670;
  isChartShow = false;

  form: FormGroup = this.formbuilder.group({
    text: ['', [Validators.maxLength(255)]],
  });

  constructor(
    private formbuilder: FormBuilder,
    public wsService: WebsocketService,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.wsService.getChat().subscribe((res: MessagesWS) => {
      this.chatId = res.id;
      this.userId = res.user.id;
      this.wsService.connect(this.chatId);
      res.messages.map((res: Message) => {
        this.greetings.push(res.message);
        this.changeDetector.detectChanges();
      });
      this.greetings.reverse();
    });
  }

  get text() {
    return this.form.get('text') as FormControl;
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
    this.wsService.sendMessage(this.userId, this.form.value.text, this.chatId);
    this.greetings = [];
    this.wsService.getChat().subscribe((res: MessagesWS) => {
      res.messages.map((res: Message) => {
        this.greetings.unshift(res.message);
        this.changeDetector.detectChanges();
      });
    });
    this.form.reset();
  }
}
