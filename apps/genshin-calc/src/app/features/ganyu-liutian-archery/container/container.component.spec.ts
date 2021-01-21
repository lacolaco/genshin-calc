import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanyuLiutianArcheryContainerComponent } from './container.component';

describe('ZhongliBurstContainerComponent', () => {
  let component: GanyuLiutianArcheryContainerComponent;
  let fixture: ComponentFixture<GanyuLiutianArcheryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanyuLiutianArcheryContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanyuLiutianArcheryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
