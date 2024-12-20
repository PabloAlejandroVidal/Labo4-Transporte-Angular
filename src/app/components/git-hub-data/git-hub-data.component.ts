import { Component, inject } from '@angular/core';
import { GithubUser, GithubUserDataService } from '../../services/github-user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-git-hub-data',
  standalone: true,
  imports: [],
  templateUrl: './git-hub-data.component.html',
  styleUrl: './git-hub-data.component.scss'
})
export class GitHubDataComponent {

  githubUserDataService: GithubUserDataService = inject(GithubUserDataService);
  subscriptions: Subscription[] = [];

  userGithubData: GithubUser | null = null;

  ngOnInit(): void {
    const suscription: Subscription = this.githubUserDataService.getUserData().subscribe((data: GithubUser)=>{
        this.userGithubData = data;
    });
    this.subscriptions.push(suscription);
  }
}
