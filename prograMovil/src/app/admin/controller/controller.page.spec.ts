import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControllerPage } from './controller.page';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient } from '@angular/common/http'

describe('ControllerPage', () => {
  let component: ControllerPage;
  let fixture: ComponentFixture<ControllerPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControllerPage],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(ControllerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title "Admin Page"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ion-title')?.textContent).toContain('Admin Page');
  });

  it('should display a list of users', () => {
    component.users = [
      { id: 1, username: 'user1', email: 'user1@example.com' },
      { id: 2, username: 'user2', email: 'user2@example.com' }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const userItems = compiled.querySelectorAll('ion-item');
    expect(userItems.length).toBe(2);
    expect(userItems[0].textContent).toContain('user1');
    expect(userItems[1].textContent).toContain('user2');
  });

  
});