import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { LoginService } from '../../../Services/Network/login.service';
import { OrderService } from '../../../Provider/Order/order.service';
import { BookService } from '../../../Provider/Book/book.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from '../../order/order.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  baseUrl: any = environment.baseUrl;
  apiUrl: string = `api/books`;

  constructor(
    public loginService: LoginService,
    public dialog: MatDialog,
    public bookService: BookService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.bookService.getBooks(0);
  }

  onRadioChange(valAvailable: string) {
      // تعيين حالة التوفر بناءً على القيمة المحددة
  if (valAvailable === 'available') {
    this.bookService.showAvailable = true;
    this.bookService.showUnavailable = false;
  } else if (valAvailable === 'unavailable') {
    this.bookService.showAvailable = false;
    this.bookService.showUnavailable = true;
  } else {
    // في حالة عرض الكل
    this.bookService.showAvailable = false;
    this.bookService.showUnavailable = false;
  }
    this.bookService.getBooks(0); // استدعاء الوظيفة لجلب البيانات
  }
  

  getPages(): number[] {
    if (!this.bookService.paginationData) return [];
    const totalPages = this.bookService.paginationData.last_page;
    const currentPage = this.bookService.paginationData.current_page;
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

  // -------------

  openOrderDialog(): void {
    const dialogRef = this.dialog.open(OrderComponent, {
      width: '500px', // تعيين العرض
      data: { }
    });
  }
}
