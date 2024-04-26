import { Component, ViewChild,OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

import { LoginService } from '../../../Services/Network/login.service';
import { environment } from '../../../../environments/environments';

// -----
import { ThemeService } from '../../../Services/Tools/ThemeService'; // قم بتعديل المسار حسب مكان الخدمة

// -----

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isMobile = false;
  showHeader: boolean = true;

  constructor(
    public themeService: ThemeService,
    private observer: BreakpointObserver,
    public loginService: LoginService,
  ) { }

  baseUrl: any = environment.baseUrl;

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }


  // ------
  ngOnInit(): void {
    // تعيين الثيم عند بدء الصفحة
    this.isAlternativeTheme=this.themeService.getTheme();
    // --------
  }

  isAlternativeTheme:boolean=true;
  toggleTheme(): void {
    this.isAlternativeTheme=!this.isAlternativeTheme;
    this.themeService.setTheme(this.isAlternativeTheme);
  }

  // ----------

  getDepth(outlet:any) {
    return outlet.activatedRouteData['depth'];
}

}
