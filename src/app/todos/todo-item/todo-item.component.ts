import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
// RxJs
import * as actions from '../todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  
  editando: boolean = false;

  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  constructor(private store: Store<AppState>) { 
  }

  ngOnInit() {
    // this.todo.completado = true; 
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      // console.log(valor);
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  } 

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);

    
  }
  terminarEdicion() {
    this.editando = false;
    if(this.txtInput.invalid){ return; } 
    if(this.txtInput.value === this.todo.texto){ return; } 
    this.store.dispatch(actions.editar({
      id: this.todo.id,
      texto: this.txtInput.value
    }))
  }

  borrar() {
    this.store.dispatch(actions.borrar({id: this.todo.id}))
  }

}
