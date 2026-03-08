import { Component, inject, OnInit } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { GetData } from '../../services/get-data';
import { response } from 'express';


@Component({
  selector: 'app-dashboard',
  imports: [Menu, TableModule, TagModule, ProgressBarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private getData = inject(GetData);

  warriors!: any[];

  cols!: any[];

  ngOnInit(): void {
    this.getData.getAllItems().subscribe({
      next: (response: any) => {
        this.warriors = response.items || response;
        console.log('Datos recibidos en el componente:', this.warriors);
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });



    this.cols = [
      { field: 'avatar', header: 'Avatar' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'raza', header: 'Raza' },
      { field: 'ki', header: 'Ki Máximo' },
      { field: 'genero', header: 'Género' }

    ];
  }


  getSeverity(status: string) {
    switch (status) {
      case 'sayan':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null;
    }
  }
}
