import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria';
import { Movimiento } from '../movimiento';
import { DataService } from '../data.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit{
  categorias: Categoria[] = [];
  movimientos: Movimiento[] = [];
  movimientosFiltrados: Movimiento[] = [];
  movimientosFiltradosPorTipo: Movimiento[] = [];
  categoriaBuscada: string = '';
  tipoBuscado: string = '';
  tipos: string[] = ['egreso', 'ingreso'];
  balance: number = 0;


  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.ngOnInit();
    this.categorias = this.dataService.getCategorias();
    this.movimientos = this.dataService.getMovimientos();
  }

  // Para agregar nuevos valores
  // nuevaCategoria: Categoria = new Categoria('', '');
  
  nuevoMovimiento: Movimiento = {
    nombre: '',
    tipo: '',
    detalle: '',
    monto: 0,
    categoria: this.categorias[0], 
    fecha: new Date(),
  };

  // Agregar
  // agregarCategoria(): void {
  //   if (this.nuevaCategoria.nombre && this.nuevaCategoria.detalle) {
  //     // Validar que se ingresen valores para nombre y detalle
  //     this.dataService.agregarCategoria(this.nuevaCategoria);
  //     // Limpiar el formulario después de agregar
  //     this.nuevaCategoria = new Categoria('', '');
  //   } else {
  //     alert('Por favor, ingrese un nombre y un detalle para la categoría.');
  //   }
  // }

  agregarMovimiento(): void {
    if (
      this.nuevoMovimiento.nombre &&
      this.nuevoMovimiento.monto > 0 &&
      this.nuevoMovimiento.fecha &&
      this.nuevoMovimiento.categoria
    ) {
      this.dataService.agregarMovimiento(this.nuevoMovimiento);
      this.nuevoMovimiento = {
        nombre: '',
        tipo: '',
        detalle: '',
        monto: 0,
        categoria: this.categorias[0],
        fecha: new Date(),
      };
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  calcularBalance(): void {
    // Filtros
    this.movimientosFiltrados = this.movimientos.filter(movimiento =>
      (this.tipoBuscado === '' || movimiento.tipo.toLowerCase() === this.tipoBuscado.toLowerCase()) &&
      (this.categoriaBuscada === '' || movimiento.categoria.nombre.toLowerCase() === this.categoriaBuscada.toLowerCase())
    );

    // Balance con filtros aplicados
    this.balance = this.movimientosFiltrados.reduce((total, movimiento) => {
      if (movimiento.tipo.toLowerCase() === 'ingreso') {
        return total + movimiento.monto;
      } else if (movimiento.tipo.toLowerCase() === 'egreso') {
        return total - movimiento.monto;
      } else {
        return total;
      }
    }, 0);
  }
}



