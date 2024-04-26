import { DataService } from '../../Services/Network/HttpClient';
import { Injectable } from '@angular/core';
import {LoginService} from "../../Services/Network/login.service"
import { Book } from '../../Model/Book';
// import { Order } from '../../Model/Order';
import { SnackbarService } from '../../Services/MessageBox/SnackbarService';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  total: number = 0;
  orders: any[] = JSON.parse(localStorage.getItem('orders') || '[]');

  constructor(private dataService: DataService,
    public loginService: LoginService,
    private snackbarService: SnackbarService) {
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);
  }
  
  addOrder(book: Book): void {  
    const existingOrderIndex = this.orders.findIndex(existingOrder => existingOrder.bookId === book.bookId);
    if (existingOrderIndex !== -1) {
      this.orders[existingOrderIndex].quantity++;
    } else {
      const order = {        
        bookId: book.bookId,
        title: book.title,
        price: book.price,
        author: book.author,
        genre: book.genre,
        availability: book.availability,
        quantity: 1
      };
      this.orders.push(order);
    }
    this.calculateTotal();
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }
  

  removeOrder(book: Book): void {
    const existingOrderIndex = this.orders.findIndex(
      existingOrder => existingOrder.bookId === book.bookId);
    if (existingOrderIndex !== -1) {
      if (this.orders[existingOrderIndex].quantity > 1) {
        this.orders[existingOrderIndex].quantity--;
      } else {
        this.orders.splice(existingOrderIndex, 1);
      }
      this.calculateTotal();
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
  }

  removeOrderAtIndex(index: number): void {
    // التأكد من أن الفهرس صحيح
    if (index >= 0 && index < this.orders.length) {
      // جلب الطلب المراد حذفه
      const orderToRemove = this.orders[index];
      // التأكد من أن الكمية أكبر من 1 قبل الحذف
      if (orderToRemove.quantity > 1) {
        // تقليل الكمية بواحد
        orderToRemove.quantity--;
      } else {
        // إذا كانت الكمية 1، حذف الطلب بشكل نهائي
        this.orders.splice(index, 1);
      }
      // إعادة حساب الإجمالي بعد حذف الطلب
      this.calculateTotal();
    }
  }

  removeAllOrders(): void {
    this.orders = [];
    this.calculateTotal();
    localStorage.removeItem('orders');
  }

  orderQuantity(book: any): number {
    const order = this.orders.find(order => order.bookId === book.bookId);
    return order ? order.quantity : 0;
  }

  // -----------
  // ----------- More
  // -----------

 
  // API Save
  isloadingSave = true;
  isError = false;
  url: string = '';
  SaveOrderResult: string = '';

  SaveOrder() {
    this.isloadingSave = true;
    this.url = `api/order`;

    const orderData = {
      user_id: this.loginService.userData?.userId, // Replace with the actual user ID
      orderType: 'delivery',
      items: this.orders,
      location: 'your_location_here',
      payment: 'cash',
      customerNotes: 'any_notes_here',
      total: this.total,
      state: 0
    };
    // console.log("orderData=",orderData);

    this.dataService.postData(this.url, orderData).subscribe({
      next: (response) => {
        this.SaveOrderResult = response;
        this.isloadingSave = false;
        this.snackbarService.openSnackBar('تم ألارسال بنجاح');
        this.removeAllOrders();
        // console.log(response);
      },
      error: (error) => {
        this.isError = true;
        console.error('Error fetching data:', error);
      },
    });
  }
  

}
