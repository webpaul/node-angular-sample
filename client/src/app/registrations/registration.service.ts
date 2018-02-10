import { Injectable } from '@angular/core';
import { Registration } from './registration';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegistrationService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  async getRegistration(id: number): Promise<Registration> {
    this.log(`Retrieved registration id=${id}`);
    return this.items.find(x => x.id == id);
  }  
  
  items: Registration[] = [
    { id: 11, name: 'Bob Smith' },
    { id: 12, name: 'Jannette Smithy' },
    { id: 13, name: 'Consuela Hernandez' },
    { id: 14, name: 'Deepak Kumar' },
    { id: 15, name: 'Albert Johnson' }
  ];

  async getRegistrations(): Promise<Registration[]> {
    this.log('Registrations retrieved from API');

    return this.items;
  }  

  private log(message: string) {
    this.messageService.add(`Registration service: ${message}`);
  }  
}
