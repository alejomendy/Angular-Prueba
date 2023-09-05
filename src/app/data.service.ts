import { Injectable, OnInit } from '@angular/core';
import { Categoria } from './categoria'; 
import { Movimiento } from './movimiento'; 
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit{
  private categorias: Categoria[] = [];
  private movimientos: Movimiento[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getCategorias();
    this.getMovimientos();
  }

  getCategorias(): Categoria[] {
    let data = this.localStorageService.leerCategorias()
    if (data != null){
      this.categorias = data
      return data;
    } else {
      return this.categorias
    }
  }

  getMovimientos(): Movimiento[] {
    let data = this.localStorageService.leerMovimientos()
    if (data != null){
      this.movimientos = data
      return data;
    } else {
      return this.movimientos
    }
  }

  agregarCategoria(categoria: Categoria): void {
    this.categorias.push(categoria);
    this.localStorageService.guardarCategorias(this.categorias);
  }

  agregarMovimiento(movimiento: Movimiento): void {
    this.movimientos.push(movimiento);
    console.log("This.movimientos:" + this.movimientos);
    this.localStorageService.guardarMovimiento(this.movimientos);
  }
}