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
  balancePorFecha: number = 0;
  busquedaPorFecha: Movimiento[] = [];
  aniosBusqueda: string[] = [];
  mesBusqueda: string = '0';
  anioBusqueda: string = '2023';
  tipoSeleccionado: string = '';


  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.ngOnInit();
    this.categorias = this.dataService.getCategorias();
    this.movimientos = this.dataService.getMovimientos();
    this.generarFechas();
  }

  generarFechas(){
    for (let index = 0; index < this.movimientos.length; index++) {
      let movimiento = this.movimientos[index];
      let movimientoFecha = movimiento.fecha.toString()
      let resultado = movimientoFecha.substring(0,4)
      if (!this.aniosBusqueda.includes(resultado)) {
        this.aniosBusqueda.push(resultado)
      }
    }
  }

  buscarMovimientosPorMesYAnio() {
    // Filtra los movimientos por mes y año seleccionados
    this.busquedaPorFecha = this.movimientos.filter(movimiento => {
      const tipo = movimiento.tipo.toLowerCase();
      const fecha = new Date(movimiento.fecha);
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Formatea el mes
      const anio = fecha.getFullYear().toString(); // Formatea el año
      return mes === this.mesBusqueda && anio === this.anioBusqueda && tipo === this.tipoSeleccionado.toLowerCase();
    });
    // Llama a la funcion para calcular el balance de estos datos
    this.calcularBalancePorFecha();
  }

  calcularBalancePorFecha() {
    // Calcula el balance sumando los montos de los movimientos filtrados
    this.balancePorFecha = this.busquedaPorFecha.reduce((total, movimiento) => {
      return total + (movimiento.tipo.toLowerCase() === 'ingreso' ? movimiento.monto : -movimiento.monto);
    }, 0);
  }

  // Para agregar nuevos valores

  nuevoMovimiento: Movimiento = {
    nombre: '',
    tipo: '',
    detalle: '',
    monto: 0,
    categoria: this.categorias[0], 
    fecha: new Date(),
  };

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
      // Generamos las fechas del nuevo movimiento (En caso de que no exista)
      this.generarFechas();
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

  // calcularBalancePorTipoYFecha(tipo: string, fecha: string): number {
  //   // Filtra los movimientos por tipo y fecha
  //   const movimientosFiltrados = this.movimientos.filter(movimiento =>
  //     movimiento.tipo.toLowerCase() === tipo.toLowerCase() &&
  //     movimiento.fecha === fecha
  //   );
  
  //   // Calcula el balance sumando los montos de los movimientos
  //   const balance = movimientosFiltrados.reduce((total, movimiento) => {
  //     return total + (movimiento.tipo.toLowerCase() === 'ingreso' ? movimiento.monto : -movimiento.monto);
  //   }, 0);
  
  //   return balance;
  // }
}



