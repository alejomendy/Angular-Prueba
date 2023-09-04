import { Categoria } from './categoria';

export class Movimiento {
  nombre: string;
  tipo: string;
  detalle: string;
  monto: number;
  categoria: Categoria;
  fecha: Date;

  constructor(nombre: string, tipo: string,detalle: string, monto: number, categoria: Categoria, fecha: Date) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.detalle = detalle;
    this.monto = monto;
    this.categoria = categoria;
    this.fecha = fecha;
  }
}