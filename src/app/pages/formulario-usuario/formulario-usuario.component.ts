import { Component, effect, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { ServiceUsersService } from '../../services/service-users.service';

@Component({
  imports: [FormsModule],
  selector: 'app-formulario-usuario',
  styleUrl: './formulario-usuario.component.css',
  templateUrl: './formulario-usuario.component.html',
})
export class FormularioUsuarioComponent {
  id = input<string>();
  private usersService = inject(ServiceUsersService);
  private router = inject(Router);

  usuario: Omit<IUser, 'id'> = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: 'https://i.pravatar.cc/150?img=1'
  };

  constructor() {
    effect(() => {
      const selectedUser = this.usersService.selectedUser();
      if (selectedUser && selectedUser.id === Number(this.id())) {
        this.usuario = {
          first_name: selectedUser.first_name,
          last_name: selectedUser.last_name,
          username: selectedUser.username,
          email: selectedUser.email,
          image: selectedUser.image
        };
      }
    });
  }

  ngOnInit(): void {
    if (this.id()) {
      this.usersService.getUserById(this.id()!);
    }
  }

  guardar(): void {
    if (!this.usuario.username) {
      this.usuario.username = this.usuario.first_name.toLowerCase().replaceAll(' ', '_');
    }

    if (this.id()) {
      this.usersService.actualizarUsuario(this.id()!, this.usuario);
    } else {
      this.usersService.crearUsuario(this.usuario);
    }

    this.router.navigate(['/home']);
  }
}
