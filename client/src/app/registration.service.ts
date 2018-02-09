import { Injectable } from '@angular/core';
import { Registration } from './registrations/registration';

@Injectable()
export class RegistrationService {

  constructor() { }

  async getRegistrations(): Promise<Registration[]> {
    return [
      { id: 11, name: 'Bob Smith' },
      { id: 12, name: 'Jannette Smithy' },
      { id: 13, name: 'Consuela Hernandez' },
      { id: 14, name: 'Deepak Kumar' },
      { id: 15, name: 'Albert Johnson' }
    ];
  }  
}
