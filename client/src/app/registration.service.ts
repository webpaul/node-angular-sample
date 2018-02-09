import { Injectable } from '@angular/core';
import { Registration } from './registrations/registration';
import { MessageService } from './message.service';

@Injectable()
export class RegistrationService {

  constructor(messagesComponent: MessageService) { 
    this.messagesComponent = messagesComponent;
  }

  private messagesComponent: MessageService;

  async getRegistrations(): Promise<Registration[]> {
    this.messagesComponent.add('Registrations retrieved from API');

    return [
      { id: 11, name: 'Bob Smith' },
      { id: 12, name: 'Jannette Smithy' },
      { id: 13, name: 'Consuela Hernandez' },
      { id: 14, name: 'Deepak Kumar' },
      { id: 15, name: 'Albert Johnson' }
    ];
  }  
}
