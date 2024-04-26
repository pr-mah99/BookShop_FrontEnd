import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isAlternativeTheme: boolean;
  themeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  getTheme(): boolean {
    return this.isAlternativeTheme;
  }

  setTheme(val: boolean): void {
    localStorage.setItem('isAlternativeTheme', val ? 'true' : 'false');
    this.isAlternativeTheme = val;
    this.themeChange.emit(val);
  }

  constructor() {
    // تعيين القيمة الافتراضية لـ false بدلاً من true
    this.isAlternativeTheme = JSON.parse(localStorage.getItem('isAlternativeTheme') ?? 'false') ? true : false;
  }
}
