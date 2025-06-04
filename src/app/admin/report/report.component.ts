import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  constructor(private apiService: ApiService) { }
  displayedColumns: string[] = [];
  reportList = new MatTableDataSource<any>([]);
  ngOnInit() {
    this.getReport();
  }

  async getReport() {
    this.apiService.getReportsData().subscribe((report:any) => {
      this.reportList.data = report.rows;
      this.displayedColumns = Object.keys(this.reportList.data[0]);
    });
  }
}
