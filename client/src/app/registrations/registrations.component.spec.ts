import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsComponent } from './registrations.component';
import { FormsModule } from '@angular/forms';

describe('RegistrationsComponent', () => {
  let component: RegistrationsComponent;
  let fixture: ComponentFixture<RegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
