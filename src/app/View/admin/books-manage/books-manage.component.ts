import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from '../../../Services/MessageBox/SnackbarService';
import { LoginService } from '../../../Services/Network/login.service';
import { DataService } from '../../../Services/Network/HttpClient';
import { BookService } from '../../../Provider/Book/book.service';
import { Book } from 'src/app/Model/Book';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { ConfirmationDialogComponent } from 'src/app/Home/Dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-books-manage',
  templateUrl: './books-manage.component.html',
  styleUrls: ['./books-manage.component.scss'],
})
export class BooksManageComponent implements OnInit {
  baseUrl: any = environment.baseUrl;

  constructor(
    public loginService: LoginService,
    public dialog: MatDialog,
    public bookService: BookService
  ) {}

  ngOnInit() {
    this.bookService.getBooks(0);
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

  // Add Book Method
  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '400px', // يمكنك تعيين حجم الحوار هنا
      disableClose: true, // يمنع إغلاق الحوار بالضغط خارجه
      data: {}, // يمكنك تمرير بيانات إضافية إلى الحوار هنا إذا كانت مطلوبة
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // يمكنك هنا إجراء أي إجراءات بعد إغلاق الحوار، مثل إعادة تحميل الكتب
    });
  }

  // Edit Book Method
  openEditBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '400px', // يمكنك تعيين حجم الحوار هنا
      disableClose: true, // يمنع إغلاق الحوار بالضغط خارجه
      data: { book: book }, // يمكنك تمرير بيانات إضافية إلى الحوار هنا إذا كانت مطلوبة
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // يمكنك هنا إجراء أي إجراءات بعد إغلاق الحوار، مثل إعادة تحميل الكتب
    });
  }

  // Delete Book Method
  openDeleteBookDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'هل أنت متأكد أنك تريد حذف هذا الكتاب؟' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If user confirms deletion
        this.bookService.deleteBook(id);
      }
    });
  }
}
