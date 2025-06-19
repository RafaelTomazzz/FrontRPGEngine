import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personagem } from '../models/personagem'


@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  apiUrl = 'http://localhost:3000/personagem/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getAllPersonagem(): Observable<Personagem[]>{
    return this.httpClient.get<Personagem[]>(this.apiUrl + 'list')
  }

}
