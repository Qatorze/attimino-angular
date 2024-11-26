import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExperiencesComponent } from './manage-experiences.component';

describe('ManageExperiencesComponent', () => {
  let component: ManageExperiencesComponent;
  let fixture: ComponentFixture<ManageExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageExperiencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
