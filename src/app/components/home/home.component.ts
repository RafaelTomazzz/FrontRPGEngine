import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Personagem } from '../../models/personagem';
import { personagemForm } from '../../models/personagemForm';
import { PersonagemService } from '../../services/personagem.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  personagens!: Personagem[]

  constructor(public personagemService: PersonagemService, private changeDetector: ChangeDetectorRef, private httpClient: HttpClient) {}

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

  @ViewChild("addcontentHidden") addcontent!: ElementRef

  viewAddCard(){
    this.addcontent.nativeElement.style.display = 'block'
  }

  closeAddCard(){
    this.addcontent.nativeElement.style.display = 'none'
  }

  addPersForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      vida: new FormControl(0, Validators.required),
      ataque: new FormControl(0, Validators.required),
      defesa: new FormControl(0, Validators.required),
      estamina: new FormControl(0, Validators.required),
      velocidade: new FormControl(0, Validators.required),
      critico: new FormControl(0, Validators.required)
  })

  apiUrl = 'http://localhost:3000/personagem/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  OnSubmit() {
    console.log(this.addPersForm.value)

    this.httpClient.post<Personagem>(this.apiUrl, this.addPersForm.value).subscribe({
        next: (res) => {
          this.closeAddCard();        
          window.location.reload();   
        }
      })
  }
} 
