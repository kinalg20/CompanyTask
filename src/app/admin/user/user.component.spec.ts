import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpLoaderFactory } from 'src/app/app.module';
import { UsersService } from 'src/app/service/users.service';
import { UserEffects } from 'src/app/state/user.effects';
import { usersFeature } from 'src/app/state/user.reducer';

describe('UserComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature(usersFeature),
        EffectsModule.forFeature([UserEffects]),
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [UsersService, TranslateStore, MatSnackBar]
    });

    it('', () => {

    })
  });
});