import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../Services/dashboard-service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dash-board-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-board-component.html',
  styleUrls: ['./dash-board-component.css']
})
export class DashBoardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.cargarUsuariosPorTipo();
     this.cargarUsuariosPorEstado();
    this.cargarAsignaturasPorProfesor();
    this.cargarPromedioPorAsignatura();
    this.cargarPromedioPorEvaluacion();
    this.cargarMensajesPorHora();
  }

  cargarUsuariosPorTipo() {
    this.dashboardService.getUsuariosPorTipo().subscribe({
      next: (data) => {
        const etiquetas = data.map(d => d.etiqueta);
        const valores = data.map(d => d.valor);
        this.generarGrafico('graficoUsuarios', etiquetas, valores, 'CANTIDAD', 'pie');
      },
      error: (err) => console.error('Error al cargar usuarios por tipo:', err)
    });
  }
  cargarUsuariosPorEstado() {
    this.dashboardService.getUsuariosPorEstado().subscribe(data => {
      new Chart("usuariosEstadoChart", {
        type: 'bar',
        data: {
          labels: data.map(d => d.etiqueta),
          datasets: [{
            label: 'Usuarios por estado',
            data: data.map(d => d.valor)
          }]
        }
      });
    });
  }
cargarPromedioPorAsignatura() {
    this.dashboardService.getPromedioPorAsignatura().subscribe(data => {
      new Chart("promedioAsignaturaChart", {
        type: 'bar',
        data: {
          labels: data.map(d => d.etiqueta),
          datasets: [{
            label: 'Promedio',
            data: data.map(d => d.valor)
          }]
        }
      });
    });
  }
  cargarAsignaturasPorProfesor() {
    this.dashboardService.getAsignaturasPorProfesor().subscribe({
      next: (data) => {
        const etiquetas = data.map(d => d.etiqueta);
        const valores = data.map(d => d.valor);
        this.generarGrafico('graficoAsignaturas', etiquetas, valores, 'Asignaturas por Profesor', 'bar');
      },
      error: (err) => console.error('Error al cargar asignaturas:', err)
    });
  }
  cargarPromedioPorEvaluacion() {
    this.dashboardService.getPromedioPorEvaluacion().subscribe(data => {
      new Chart("promedioEvaluacionChart", {
        type: 'line',
        data: {
          labels: data.map(d => d.etiqueta),
          datasets: [{
            label: 'Promedio por Evaluación',
            data: data.map(d => d.valor),
            fill: false,
            borderColor: 'blue'
          }]
        }
      });
    });
  }
cargarMensajesPorHora() {
    this.dashboardService.getMensajesPorHora().subscribe(data => {
      new Chart("mensajesHoraChart", {
        type: 'line',
        data: {
          labels: data.map(d => d.etiqueta),
          datasets: [{
            label: 'Mensajes por Hora',
            data: data.map(d => d.valor),
            fill: true,
            borderColor: 'green',
            backgroundColor: 'rgba(0,255,0,0.1)'
          }]
        }
      });
    });
  }
  generarGrafico(canvasId: string, etiquetas: string[], valores: number[], titulo: string, tipo: 'bar' | 'pie') {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: tipo,
      data: {
        labels: etiquetas,
        datasets: [{
          label: titulo,
          data: valores,
          backgroundColor: [
            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
          ],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: tipo === 'pie' },
          title: { display: true, text: titulo }
        },
        scales: tipo === 'bar' ? { y: { beginAtZero: true } } : {}
      }
    });
  }
}
