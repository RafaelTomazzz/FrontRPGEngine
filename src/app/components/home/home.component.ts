import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personagem } from '../../models/personagem';
import { PersonagemService } from '../../services/personagem.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  personagens!: Personagem[]

  constructor(public personagemService: PersonagemService) {}

  ngOnInit(): void {
    this.getAllPersonagem()
  }

  getAllPersonagem(){
    this.personagemService.getAllPersonagem().subscribe(res => {
      this.personagens = res

      console.log(this.personagens)
    })
  }
}
