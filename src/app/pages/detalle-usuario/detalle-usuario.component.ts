import { Component, input, inject } from '@angular/core';
import { ServiceUsersService } from '../../services/service-users.service';


@Component({
  imports: [],
  selector: 'app-detalle-usuario',
  styleUrl: './detalle-usuario.component.css',
  templateUrl: './detalle-usuario.component.html',
})
export class DetalleUsuarioComponent {
  id = input.required<string>();
  private usersService = inject(ServiceUsersService);
  usuario = this.usersService.selectedUser;

  ngOnInit(): void {
    this.usersService.getUserById(this.id());
  }
}
