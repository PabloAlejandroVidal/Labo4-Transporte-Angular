import { Component, inject } from '@angular/core';
import { GitHubDataComponent } from "../../components/git-hub-data/git-hub-data.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GitHubDataComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
