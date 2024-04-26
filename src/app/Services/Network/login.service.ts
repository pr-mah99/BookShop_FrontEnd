// login.service.ts
import { Injectable } from '@angular/core';
import { SnackbarService } from '../../Services/MessageBox/SnackbarService';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginState: boolean = false;
  public userData: any = [];

  getLoginState(): void {
    // حفظ البيانات في LocalStorage

    const storedLoginState = localStorage.getItem('loginState');
    this.loginState = storedLoginState ? JSON.parse(storedLoginState) : false;

    const storedUserData = localStorage.getItem('userData');
    this.userData = storedUserData ? JSON.parse(storedUserData) : [];

    console.log(this.loginState);
    console.log(this.userData);
    
  }
  // getUserData(): string | null {
  //   return this.userData;
  // }
  //   -------
  setLoginState(data: any): void {
    console.log('سيتم تخزين الاعدادات');
    this.loginState = true;
    this.userData = data;
    
    // حفظ البيانات في LocalStorage
    localStorage.setItem('loginState', JSON.stringify(true));
    localStorage.setItem('userData', JSON.stringify(data));
    console.log('تم التخزين بنجاح');
  }

  logout():void{
    this.userData=[];
    this.loginState=false;
    // ---------
    localStorage.removeItem('loginState');
    localStorage.removeItem('userData');  
  }
}
