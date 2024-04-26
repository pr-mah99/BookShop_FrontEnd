import { Component,Inject } from '@angular/core';
import { OrderService } from '../../Provider/Order/order.service';
import { environment } from '../../../environments/environments';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {LoginService} from "../../Services/Network/login.service"

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  baseUrl: string = environment.baseUrl;

  constructor(public orderService: OrderService, 
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public dataX: { restaurant: number }
    ) { 

    }


}
