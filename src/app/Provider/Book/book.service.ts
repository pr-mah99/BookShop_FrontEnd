import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../Services/Network/HttpClient';
import { Book } from '../../Model/Book';
import { SnackbarService } from '../../Services/MessageBox/SnackbarService';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  constructor(
    private dataService: DataService,
    private snackbarService: SnackbarService
  ) {}

  data: Book[] = [];
  loading = false;

  // -----------
  showAvailable: boolean = false;
  showUnavailable: boolean = false;
  showAll: boolean = true;
  // -----------

  loadingAdd = false;
  loadingEdit = false;
  loadingDelete = false;

  paginationData: any; // تخزين بيانات Pagination

  searchTerm: string = '';
  valAvailable: string='all';

  getBooks(page: number) {
    this.loading = true;
  
    let url = `api/books?page=${page}&search=${this.searchTerm.trim()}`;
  
    // تحقق من حالة التوفر المختارة
    if (this.valAvailable !== 'all') {
      if (this.valAvailable === 'available') {
        url += '&availability=1';
      } else if (this.valAvailable === 'unavailable') {
        url += '&availability=0';
      }
    }
  
    this.dataService.getData(url).subscribe({
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
  

  addBook(book: Book) {
    this.loadingAdd = true;
    this.dataService.postData('api/books', book).subscribe({
      next: (response) => {
        this.snackbarService.openSnackBar('تم الاضافة بنجاح');
        this.data.push(response);
      },
      error: (error) => {
        this.snackbarService.openSnackBar('حدث خطأ');
        console.error('Error adding book:', error);
      },
      complete: () => {
        this.loadingAdd = false;
      },
    });
  }

  updateBook(book: Book) {
    console.log('book=', book);

    this.loadingEdit = true;
    this.dataService.putData(`api/books/${book.bookId}`, book).subscribe({
      next: (response) => {
        // console.log("response=",response);
        
        this.snackbarService.openSnackBar('تم التعديل بنجاح');
        // البحث عن الكتاب الحالي في المصفوفة
        const index = this.data.findIndex((b) => b.bookId === book.bookId);
        if (index !== -1) {
          // تحديث القيمة في المصفوفة
          this.data.splice(index, 1, book);
        }
      },
      error: (error) => {
        this.snackbarService.openSnackBar('حدث خطأ');
        console.error('Error edit book:', error);
      },
      complete: () => {
        this.loadingEdit = false;
      },
    });
  }

  deleteBook(id: number) {
    this.loadingDelete = true;
    this.dataService.deleteData(`api/books/${id}`).subscribe({
      next: (response) => {
        console.log(response);
        
        this.snackbarService.openSnackBar('تم الحذف بنجاح');
        this.data = this.data.filter((book) => book.bookId !== id);
      },
      error: (error) => {
        this.snackbarService.openSnackBar('حدث خطأ');
        console.error('Error delete book:', error);
      },
      complete: () => {
        this.loadingDelete = false;
      },
    });
  }
}
