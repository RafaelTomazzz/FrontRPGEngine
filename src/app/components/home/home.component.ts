import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
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

  constructor(public personagemService: PersonagemService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllPersonagem()
  }

  getAllPersonagem(){
    this.personagemService.getAllPersonagem().subscribe(res => {
      this.personagens = res
    })
  }

  @ViewChild("contentHidden") content!: ElementRef
  personagemSelecionado: Personagem | null = null

  viewCard(id: number){
    this.personagemService.getByIdPersonagem(id).subscribe((res:any)=> {
      this.personagemSelecionado = res.personagem
      this.changeDetector.detectChanges()

      this.content.nativeElement.style.display = 'block'
      console.log(this.personagemSelecionado)
    })
    
  }

  closeCard(){
    this.content.nativeElement.style.display = 'none'
  }

  deletePersonagem(id: number){
    this.personagemService.deleteByIdPersonagem(id).subscribe((res:any) => {
      console.log('ola mundo')

      this.closeCard()
      this.changeDetector.detectChanges()
      window.location.reload()
    })
  }
} 
