import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria';
import { Movimiento } from '../movimiento';
import { DataService } from '../data.service';

@Component({
  selector: 'app-base',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit{
  categorias: Categoria[] = [];
  categoriaBuscada: string = '';
  tipoBuscado: string = '';
  tipos: string[] = ['egreso', 'ingreso'];
  balance: number = 0;


  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.ngOnInit();
    this.categorias = this.dataService.getCategorias();
  }

  // Para agregar nuevos valores
  nuevaCategoria: Categoria = new Categoria('', '');

  // Agregar
  agregarCategoria(): void {
    if (this.nuevaCategoria.nombre && this.nuevaCategoria.detalle) {
      // Validar que se ingresen valores para nombre y detalle
      this.dataService.agregarCategoria(this.nuevaCategoria);
      // Limpiar el formulario después de agregar
      this.nuevaCategoria = new Categoria('', '');
    } else {
      alert('Por favor, ingrese un nombre y un detalle para la categoría.');
    }
  }
  
}



