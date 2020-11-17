import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import {UserService} from '../user.service';

class MockUserService {
  isLoggedIn = true;
  user = { name: 'Test User'};
}

describe('WelcomeComponent (minimal)', () => {

  it('should create', () => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ]
    });
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });



  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     // provide the component-under-test and dependent service
  //     providers: [
  //       WelcomeComponent,
  //       { provide: UserService, useClass: MockUserService }
  //     ]
  //   });
  //   // inject both the component and the dependent service.
  //   component = TestBed.get(WelcomeComponent);
  //   userService = TestBed.get(UserService);
  //
  //   it('should not have welcome message after construction', () => {
  //     expect(component.welcome).toBeUndefined();
  //   });
  //
  //   it('should welcome logged in user after Angular calls ngOnInit', () => {
  //     component.ngOnInit();
  //     expect(component.welcome).toContain(userService.user.name);
  //   });
  //
  //   it('should ask user to log in if not logged in after ngOnInit', () => {
  //     userService.isLoggedIn = false;
  //     component.ngOnInit();
  //     expect(component.welcome).not.toContain(userService.user.name);
  //     expect(component.welcome).toContain('log in');
  //   });
  // });


  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ WelcomeComponent ]
  //   })
  //   .compileComponents();
  // }));
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(WelcomeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

describe('WelcomeComponent (with beforeEach)', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  let userService: UserService;
  let comp: WelcomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [
        WelcomeComponent,
        { provide: UserService, useClass: MockUserService }
      ]
    });
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    comp = TestBed.get(WelcomeComponent);
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "Welcome, Test User"', () => {
    fixture.detectChanges();
    const welcomeElement: HTMLElement = fixture.nativeElement;
    expect(welcomeElement.querySelector('i').textContent).toContain('Welcome, Test User');
  });

  it('should not have welcome message after construction', () => {
    expect(comp.welcome).toBeUndefined();
  });

  it('should welcome logged in user after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.welcome).toContain(userService.user.name);
  });

  it('should ask user to log in if not logged in after ngOnInit', () => {
    userService.isLoggedIn = false;
    comp.ngOnInit();
    expect(comp.welcome).not.toContain(userService.user.name);
    expect(comp.welcome).toContain('log in');
  });
});
