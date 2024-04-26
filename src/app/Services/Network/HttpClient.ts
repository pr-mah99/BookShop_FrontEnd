import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginService } from '../../Services/Network/login.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient,
    public loginService: LoginService) {}

  getData(apiUrl: string): Observable<any> {
    console.log('url get ='+ environment.baseUrl+apiUrl);
    const authHeader = this.createAuthorizationHeader();
    console.log('Header =', authHeader);

    return this.http.get<any>(environment.baseUrl + apiUrl, { headers: authHeader }).pipe(
      tap(data => localStorage.setItem(apiUrl, JSON.stringify(data))) // تخزين البيانات بعد استلامها
    );
  }
  // ---
  
  postData(apiUrl: string, data: any): Observable<any> {
    console.log('url post =', environment.baseUrl+ apiUrl); 
    const authHeader = this.createAuthorizationHeader();
    console.log('authHeader =', authHeader); 
    return this.http.post<any>(environment.baseUrl + apiUrl, data, {
      headers: authHeader,
      responseType: 'json',
    });
  }

  putData(apiUrl: string, data: any): Observable<any> {
    console.log('url put =', environment.baseUrl+ apiUrl); 
    const authHeader = this.createAuthorizationHeader();
    console.log('authHeader =', authHeader); 
    return this.http.put<any>(environment.baseUrl + apiUrl, data, {
      headers: authHeader,
      responseType: 'json'
    });
  }

  deleteData(apiUrl: string): Observable<any> {
    console.log('url delete =', environment.baseUrl+ apiUrl); 
    const authHeader = this.createAuthorizationHeader();
    console.log('authHeader =', authHeader); 
    return this.http.delete<any>(environment.baseUrl + apiUrl, {
      headers: authHeader,
      responseType: 'json'
    });
  }

  // --------

  private createAuthorizationHeader(): HttpHeaders {
    const authToken = this.loginService.userData?.token;
    console.log('authHeader =', authToken); 
    const authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    });
    return authHeader;
  }
  
}
