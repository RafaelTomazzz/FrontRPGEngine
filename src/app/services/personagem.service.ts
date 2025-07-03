import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personagem } from '../models/personagem'
import { personagemForm } from '../models/personagemForm';


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

  public getByIdPersonagem(id: number): Observable<Personagem>{
    return this.httpClient.get<Personagem>(this.apiUrl + 'getbyid/' + id)
  }

  public deleteByIdPersonagem(id: number): Observable<Personagem>{
    return this.httpClient.delete<Personagem>(this.apiUrl + id)
  }

  public postPersonagem(personagem: personagemForm): Observable<Personagem>{
    return this.httpClient.post<Personagem>(this.apiUrl, personagem)
  }

}
