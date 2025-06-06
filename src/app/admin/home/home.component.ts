import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dashboardTotals: any = {};
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.apiService.getDashboardCards().subscribe((res: any) => {
      this.dashboardTotals = res.data['summary']
    })
  }
}
