import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhongliPlanetBefallContainerComponent } from './container.component';

describe('ZhongliBurstContainerComponent', () => {
  let component: ZhongliPlanetBefallContainerComponent;
  let fixture: ComponentFixture<ZhongliPlanetBefallContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZhongliPlanetBefallContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhongliPlanetBefallContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
