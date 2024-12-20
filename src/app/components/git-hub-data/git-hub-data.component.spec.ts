import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitHubDataComponent } from './git-hub-data.component';

describe('GitHubDataComponent', () => {
  let component: GitHubDataComponent;
  let fixture: ComponentFixture<GitHubDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitHubDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitHubDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
