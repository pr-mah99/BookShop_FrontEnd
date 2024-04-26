import { Component } from '@angular/core';
import { environment } from '../../../environments/environments';

import { SnackbarService } from '../../Services/MessageBox/SnackbarService';
import { LoginService } from '../../Services/Network/login.service';
import { DataService } from '../../Services/Network/HttpClient';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  baseUrl: any = environment.baseUrl;
  
  // Define properties for email and password
  loginEmail: string='';
  loginPassword: string='';

  signupName: string='';
  signupEmail: string='';
  signupPassword: string='';

  showLoginForm:boolean = true;

  loading:boolean = false;
  data:any=[];

  constructor(public loginService: LoginService,
    private dataService: DataService,
    private snackbarService: SnackbarService,
    ) {}

    ngOnInit() {

      this.loginService.loginState;
      this.loginService.userData;
    }

    url: string = '';
    onSubmitLogin(): void {

      if (this.loginEmail === '') {
        this.snackbarService.openSnackBar('أدخل الايميل');
      }else  if (this.loginPassword === '') {
        this.snackbarService.openSnackBar('أدخل كلمةالمرور');
      }else{

     
      this.url = 'api/login';
  
      this.loading = true;
  
      // Api
      this.dataService
        .postData(this.url, {
          email: this.loginEmail,
          password: this.loginPassword,           
        })
        .subscribe({
          next: (response) => {
            this.data = response;
            console.log(response);
            // this.msg = JSON.stringify(response);
  
            // ------
  
            if (this.data.user['id'] == null) {
              this.snackbarService.openSnackBar('تاكد من كلمة المرور او الايميل');
            } else {             
  
              //save Data
              this.loginService.setLoginState({
                userId: this.data?.user?.id?.toString() || '',
                fullname: this.data?.user?.name?.toString() || '',                        
                email: this.data?.user?.email?.toString() || '',
                token: this.data?.access_token?.toString() || '',
                type: this.data?.user?.type?.toString() || '',
            });
            
              
              this.snackbarService.openSnackBar('تم تسجيل الدخول بنجاح');
            }
          },
          
          error: (error) => {
            this.loading = false;
            this.snackbarService.openSnackBar('تاكد من كلمة المرور او الايميل');
            // this.snackbarService.openSnackBar(error.error.message);
            // this.msg = 'error =' + JSON.stringify(error);
            console.error('Error fetching data:', error);
            console.log('Error text:', error.text);
          },
          complete: () => {
            this.loading = false;
          },
        });
      }
      // ----------
    }

    onSubmitSignup(): void {
      if (this.signupName === '') {
        this.snackbarService.openSnackBar('أدخل الاسم');
      } else if (this.signupEmail === '') {
        this.snackbarService.openSnackBar('أدخل البريد الإلكتروني');
      } else if (this.signupPassword === '') {
        this.snackbarService.openSnackBar('أدخل كلمة المرور');
      } else {
        this.url = 'api/signup'; // تغيير المسار إلى مسار إنشاء الحساب الجديد
    
        this.loading = true;
    
        // إرسال طلب POST لإنشاء الحساب الجديد
        this.dataService
          .postData(this.url, {
            name: this.signupName.toString(),
            email: this.signupEmail.toString(),
            password: this.signupPassword.toString(),
          })
          .subscribe({
            next: (response) => {
              this.data = response;
              console.log(response);
              this.snackbarService.openSnackBar('تم إنشاء الحساب بنجاح.');
            },
            error: (error) => {     
              this.loading = false;       
              this.snackbarService.openSnackBar(error.error.message);
              console.error('Error fetching data:', error);
              console.log('Error text:', error.text);
            },
            complete: () => {
              this.loading = false;
            },
          });
      }
    }
    
    signOut(): void {
      this.loginService.logout();
      this.snackbarService.openSnackBar('تم تسجيل الخروج');
    }
  
    // ------
  

}
