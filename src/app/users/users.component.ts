import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  protected authService: AuthService = inject(AuthService);
  protected users: User[] = [];

  ngOnInit() {
    this.authService.getUsers().subscribe(users => this.users = users);
  }

  handleDelete(email: string) {
    this.authService.deleteUser(email).subscribe(() => this.authService.getUsers().subscribe(
      users => this.users = users
    ));
  }
}
