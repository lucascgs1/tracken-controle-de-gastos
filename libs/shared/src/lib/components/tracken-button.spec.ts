import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackenButton } from './tracken-button';

describe('TrackenButton', () => {
  let component: TrackenButton;
  let fixture: ComponentFixture<TrackenButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackenButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackenButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
