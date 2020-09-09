import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Observable, Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  name: string = ''
  name$: Observable<any>

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    this.name$ = this.store.select('user').pipe(
      filter(({ user }) => user != null)
    )
  }

  logout() {
    this.authService.logoutUsuario()
      .then(() => this.router.navigate(['/login']))
  }

}
