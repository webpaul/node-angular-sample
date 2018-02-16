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

  async getRegistration(id: string): Promise<Registration> {
    this.log(`Retrieved registration id=${id}`);

    try {
      var result = await this.http.get<any>(this.apiUrl + "/" + id).toPromise();
      this.toModel(result);
      return result as Registration;
    } catch(ex) {
      this.log(ex);
    }
  }  
  
  public apiUrl: string = 'http://localhost:8080/api/registration';

  async getRegistrations(): Promise<Registration[]> {
    this.log('Registrations retrieved from API');

    try {
      var result = await this.http.get<any[]>(this.apiUrl).toPromise();
      result.forEach(item => {
        this.toModel(item);
      });
      return result as Registration[];
    } catch(ex) {
      this.log(ex);
    }
  }  

  private toModel(item: any) {
    if(!item) return;

    item.id = item._id;
    item.name = item.first_name + ' ' + item.last_name;
  }

  private log(message: string) {
    this.messageService.add(`Registration service: ${message}`);
  }  
}
