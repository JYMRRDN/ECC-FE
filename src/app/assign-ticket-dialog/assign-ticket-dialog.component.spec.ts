import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketDialogComponent } from './assign-ticket-dialog.component';

describe('AssignTicketDialogComponent', () => {
  let component: AssignTicketDialogComponent;
  let fixture: ComponentFixture<AssignTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTicketDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
