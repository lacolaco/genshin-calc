import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentLevelSelectComponent } from './talent-level-select.component';

describe('TalentLevelSelectComponent', () => {
  let component: TalentLevelSelectComponent;
  let fixture: ComponentFixture<TalentLevelSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalentLevelSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentLevelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
