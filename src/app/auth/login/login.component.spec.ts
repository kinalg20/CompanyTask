import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { UsersService } from 'src/app/service/users.service';
import { PermissionService } from 'src/app/service/permission.service';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'src/app/service/toast.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService>;
  let permissionSpy: jasmine.SpyObj<PermissionService>;
  let toastSpy: jasmine.SpyObj<ToastService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const usersServiceMock = jasmine.createSpyObj('UsersService', ['loginUser']);
    const permissionServiceMock = jasmine.createSpyObj('PermissionService', ['setLoader']);
    const toastServiceMock = jasmine.createSpyObj('ToastService', ['showToast']);
    const apiServiceMock = jasmine.createSpyObj('ApiService', ['getJsonData']);
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,HttpClientModule,SharedModule,BrowserAnimationsModule],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: PermissionService, useValue: permissionServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: ApiService, useValue:  apiServiceMock},
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    permissionSpy = TestBed.inject(PermissionService) as jasmine.SpyObj<PermissionService>;
    toastSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call login service when form is invalid', () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.onLogin();
    expect(userServiceSpy.loginUser).not.toHaveBeenCalled();
  });

  it('should call login service and navigate on success', () => {
    const mockResponse = { token: 'abc123' };
    userServiceSpy.loginUser.and.returnValue(of(mockResponse));

    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('password');
    component.onLogin();

    expect(userServiceSpy.loginUser).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/admin/home');
  });

  it('should show toast if login fails', () => {
    const mockError = { error: { error: 'Invalid credentials' } };
    userServiceSpy.loginUser.and.returnValue(throwError(() => mockError));

    component.loginForm.controls['username'].setValue('wrong');
    component.loginForm.controls['password'].setValue('wrong');
    component.onLogin();

    expect(toastSpy.showToast).toHaveBeenCalledWith('Invalid credentials');
  });
});
