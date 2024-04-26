import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    // تعريف المتغير showBackToTopButton
    showBackToTopButton = false;
    
  // عند النقر على الزر، ستقوم بالتمرير إلى أعلى الصفحة
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    this.checkScroll();
  }
  
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
    // تقدير موقع التمرير الذي يجعل الزر مرئيًا
    const scrollThreshold = 200;
  
    // قم بتحديث قيمة showBackToTopButton بناءً على الموقف
    this.showBackToTopButton = scrollPosition > scrollThreshold;
  }

  // ----

  ngOnInit() {
    // التسجيل لحدث التمرير عند تحميل المكون
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  }
  ngOnDestroy() {
    // إلغاء تسجيل حدث التمرير عند إزالة المكون
    window.removeEventListener('scroll',this.onWindowScroll.bind(this));
  }
  
}
