import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { SnackbarService } from '../../../Services/MessageBox/SnackbarService';
import { LoginService } from '../../../Services/Network/login.service';
import { DataService } from '../../../Services/Network/HttpClient';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-manage',
  templateUrl: './orders-manage.component.html',
  styleUrls: ['./orders-manage.component.scss']
})
export class OrdersManageComponent implements OnInit {
  baseUrl: any = environment.baseUrl;

  constructor(
    public dataService: DataService,
    public loginService: LoginService,
    public dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.getOrders(0);
  }

  data: any = [];
  loading = false;

  paginationData: any; // تخزين بيانات Pagination

  getOrders(page: number) {
    this.loading = true;

    this.dataService.getData(`api/order?page=${page}`).subscribe({
      next: (response) => {
        this.data = response.data;
        this.paginationData = response;
      },
      error: (error) => {        
        console.error('Error fetching data:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  getPages(): number[] {
    if (!this.paginationData) return [];
    const totalPages = this.paginationData.last_page;
    const currentPage = this.paginationData.current_page;
    const pagesToShow = 5;
    let startPage: number, endPage: number;

    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfPagesToShow = Math.floor(pagesToShow / 2);
      if (currentPage <= halfPagesToShow) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (currentPage + halfPagesToShow >= totalPages) {
        startPage = totalPages - pagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfPagesToShow;
        endPage = currentPage + halfPagesToShow;
      }
    }

    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );
    return pages;
  }
}
