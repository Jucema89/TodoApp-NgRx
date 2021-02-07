import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import * as actions from './todo.actions';

export const estadoInicial:Todo[] = [
    new Todo('Salvar al Mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar Traje de Iron Man'),
    new Todo('Robar Escudo del Cap'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on( actions.crear, (state, { texto }) => [...state, new Todo( texto )]  ),

  on( actions.toggle, (state, { id }) => {
    return state.map( todo => {
      if( todo.id === id ) {
        return {
          ... todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    })
  }),

  on( actions.editar, (state, { id, texto }) => {
    return state.map( todo => {
      if( todo.id === id ) {
        return {
          ... todo,
          texto: texto
        }
      } else {
        return todo;
      }
    })
  }),

  on( actions.borrar, (state, { id }) => {
    return state.filter( todo => todo.id !== id )
  }),
  
  on( actions.borrarCompletados, state => state.filter(todo => !todo.completado)),

  on( actions.toggleAll, state => {
    return state.map( todo => {
      if( todo ) {
        return {
          ... todo,
          completado: !todo.completado
        }
      }
    })
  }),
  


);





export function todoReducer(state, action) {
  return _todoReducer(state, action);
}