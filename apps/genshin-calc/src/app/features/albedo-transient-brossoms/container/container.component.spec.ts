import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbedoTransientBlossomsContainerComponent } from './container.component';

describe('ZhongliBurstContainerComponent', () => {
  let component: AlbedoTransientBlossomsContainerComponent;
  let fixture: ComponentFixture<AlbedoTransientBlossomsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbedoTransientBlossomsContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbedoTransientBlossomsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
