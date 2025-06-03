import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonTableComponent } from './common-table/common-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';


const exportsModule = [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  CommonModule,
  MatTableModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule,
  TranslateModule
]

const exportComponent = [CommonTableComponent , ConfirmationDialogComponent]


@NgModule({
  declarations: [...exportComponent],
  imports: [
   ...exportsModule
  ],
  exports : [...exportsModule , ...exportComponent]
})
export class SharedModule { }
