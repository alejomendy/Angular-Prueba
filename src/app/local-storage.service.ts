import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { Movimiento } from './movimiento';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  guardarCategorias(categorias: Categoria[]){
    localStorage.setItem("Categorias", JSON.stringify(categorias))
  }

  leerCategorias(){
    let categorias = (localStorage.getItem("Categorias"))
    if (categorias != null){
      return JSON.parse(categorias)
    }
  }

  guardarMovimiento(movimientos: Movimiento[]){
    localStorage.setItem("Movimientos", JSON.stringify(movimientos))
  }

  leerMovimientos(){
    let movimientos = (localStorage.getItem("Movimientos"))
    if (movimientos != null){
      return JSON.parse(movimientos)
    }
  }
}
