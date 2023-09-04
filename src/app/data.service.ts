import { Injectable, OnInit } from '@angular/core';
import { Categoria } from './categoria'; 
import { Movimiento } from './movimiento'; 

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit{
  private categorias: Categoria[] = [];
  private movimientos: Movimiento[] = [];

  ngOnInit(): void {
    this.generarEjemplos(); 
  }

  constructor() {}

  getCategorias(): Categoria[] {
    return this.categorias;
  }

  getMovimientos(): Movimiento[] {
    return this.movimientos;
  }

  agregarCategoria(categoria: Categoria): void {
    this.categorias.push(categoria);
  }

  agregarMovimiento(movimiento: Movimiento): void {
    this.movimientos.push(movimiento);
  }

  private generarEjemplos(): void {
    // Ejemplos de categorías
    const categoria1 = new Categoria('Alimentación', 'Gastos relacionados con comida');
    const categoria2 = new Categoria('Transporte', 'Gastos de transporte');
    const categoria3 = new Categoria('Ventas', 'Ventas virtuales');

    // Ejemplos de movimientos
    const movimiento1 = new Movimiento('Compra de supermercado','Egreso', 'Compras mensuales', 100, categoria1, new Date());
    const movimiento2 = new Movimiento('Gasolina','Egreso', 'Llenado de gasolina', 50, categoria2, new Date());
    const movimiento3 = new Movimiento('Venta de Facebook','Ingreso', 'Venta telefono usado', 20, categoria3, new Date());

    // Agregar ejemplos a las listas
    this.categorias.push(categoria1, categoria2, categoria3);
    this.movimientos.push(movimiento1, movimiento2, movimiento3);
  }
}