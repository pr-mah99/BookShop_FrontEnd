import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './Services/Tools/ThemeService';
import { LoginService } from './Services/Network/login.service';

// -------

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

    // ------Theme
    isAlternativeTheme: boolean = false;
    private themeSubscription: Subscription;
    // ------Theme End

  constructor(
    
    private loginService: LoginService,

    public themeService: ThemeService) {
      // ---------Theme 
      this.themeSubscription = this.themeService.themeChange.subscribe(
        (value) => {
          this.isAlternativeTheme = value;
        }
      );
      // ---------Theme End
  }

  
  ngOnDestroy(): void {
    // إلغاء الاشتراك عند تدمير المكون
    this.themeSubscription.unsubscribe();
  }

  ngOnInit() {
    // Theme
    // تعيين الثيم عند بدء الصفحة
    this.isAlternativeTheme = this.themeService.getTheme();
    // Theme End
    // ------------
    this.loginService.getLoginState(); //حالة تسجيل الدخول
  }

}
