import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';
import { PermissionService } from 'src/app/service/permission.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  constructor(private apiService: ApiService,private permission : PermissionService) { }
  displayedColumns: string[] = [];
  reportList = new MatTableDataSource<any>([]);
  ngOnInit() {
    this.getReport();
  }

  async getReport() {
    this.permission.setLoader(true);
    this.apiService.getReportsData().subscribe({
      next: (report : any) => {
        this.reportList.data = report.rows;
        this.displayedColumns = Object.keys(this.reportList.data[0]);
      },
      complete:()=>{
        this.permission.setLoader(false);
      },
      error : (err)=>{
        console.log(err);
        this.permission.setLoader(false);
      }
    })
  }
}
