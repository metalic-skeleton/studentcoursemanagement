import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Management';
  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = !!window.sessionStorage.getItem('auth-token');
  }

  logout(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }

}
