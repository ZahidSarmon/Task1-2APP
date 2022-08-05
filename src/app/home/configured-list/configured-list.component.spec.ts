import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguredListComponent } from './configured-list.component';

describe('ConfiguredListComponent', () => {
  let component: ConfiguredListComponent;
  let fixture: ComponentFixture<ConfiguredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguredListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
