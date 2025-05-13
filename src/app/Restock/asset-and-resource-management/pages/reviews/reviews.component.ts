import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Review {
  restaurant: string;
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements AfterViewInit {

  displayedColumns: string[] = ['restaurant', 'rating', 'comment', 'date'];
  dataSource = new MatTableDataSource<Review>([
    { restaurant: 'Punto Limon', rating: 5, comment: 'Excelente proveedor...', date: '16/04/2025' },
    { restaurant: 'Amazonas Restaurant', rating: 3, comment: 'Excelente proveedor...', date: '16/04/2025' },
    { restaurant: 'Cebiche Peru', rating: 5, comment: 'Todo llegó fresco...', date: '16/04/2025' },
    { restaurant: 'Sabor y Postres', rating: 2, comment: 'Buena experiencia...', date: '16/04/2025' },
    { restaurant: 'Lincon Restaurant', rating: 4, comment: 'Productos de calidad...', date: '16/04/2025' },
    { restaurant: 'El Mariachi', rating: 4, comment: 'Productos de calidad...', date: '16/04/2025' },
    { restaurant: 'La cantina', rating: 5, comment: 'Productos de calidad...', date: '16/04/2025' },
    { restaurant: 'Sabor Azteca', rating: 4, comment: 'Productos de calidad...', date: '16/04/2025' },
    { restaurant: 'El Sombrero', rating: 5, comment: 'Productos llegaron bien...', date: '16/04/2025' },
    { restaurant: 'La Taquería', rating: 4, comment: 'Productos de calidad...', date: '14/04/2025' },
    { restaurant: 'El Guacamole', rating: 4, comment: 'Excelente atencion y buneos productos...', date: '14/04/2025' },
    { restaurant: 'La Fiesta Mexicana', rating: 5, comment: 'Buen servicio...', date: '13/04/2025' },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  get averageReview(): number {
    const total = this.dataSource.data.reduce((acc, val) => acc + val.rating, 0);
    return this.dataSource.data.length ? parseFloat((total / this.dataSource.data.length).toFixed(1)) : 0;
  }
}
