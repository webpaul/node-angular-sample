import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(messageService: MessageService) { 
    this.messageService = messageService;
  }

  messageService: MessageService;
  
  ngOnInit() {
  }
}
