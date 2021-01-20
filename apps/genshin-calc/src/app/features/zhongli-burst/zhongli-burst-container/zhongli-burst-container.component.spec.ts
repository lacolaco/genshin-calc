import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhongliBurstContainerComponent } from './zhongli-burst-container.component';

describe('ZhongliBurstContainerComponent', () => {
  let component: ZhongliBurstContainerComponent;
  let fixture: ComponentFixture<ZhongliBurstContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZhongliBurstContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhongliBurstContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
