import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUser, IUserError } from '../interfaces/iuser.interface';

@Injectable({
    providedIn: 'root'
})
export class ServiceUsersService {

    private apiUrl = 'https://jsonplaceholder.typicode.com/users';
    private httpCliente = inject(HttpClient);

    usersResponse = signal<IUser[]>([]);
    mensajeError = signal<IUserError | null>(null);

    // Obtiene todos los usuarios de la API y los guarda en el Signal.
    getUsers(): void {
        // La petición HTTP devuelve un Observable que se procesa con subscribe.
        this.httpCliente.get<any[]>(this.apiUrl).subscribe({
            next: (response) => {
                // Adapta la respuesta de la API al formato definido en IUser.
                const users: IUser[] = response.map((user) => {
                    // Divide el nombre completo en primer nombre y apellido(s).
                    const [firstName, ...lastNameParts] = user.name.split(' ');

                    return {
                        id: user.id,
                        first_name: firstName,
                        last_name: lastNameParts.join(' '),
                        username: user.username,
                        email: user.email,
                        image: `https://i.pravatar.cc/150?img=${user.id}`
                    };
                });

                // Actualiza el Signal para que los componentes reflejen los usuarios.
                this.usersResponse.set(users);
            },
            error: (error) => {
                // Guarda el error para poder mostrarlo en la interfaz.
                this.mensajeError.set({
                    error: error?.message || 'Error al obtener los usuarios'
                });
            }
        });
    }

    getUserById(id: string): void {
        this.httpCliente.get<any>(`${this.apiUrl}/${id}`).subscribe({
            next: (user) => {
                const [firstName, ...lastNameParts] = user.name.split(' ');

                this.selectedUser.set({
                    id: user.id,
                    first_name: firstName,
                    last_name: lastNameParts.join(' '),
                    username: user.username,
                    email: user.email,
                    image: `https://i.pravatar.cc/150?img=${user.id}`
                });
            },
            error: (error) => {
                this.mensajeError.set({
                    error: error?.message || 'Error al obtener el usuario'
                });
            }
        });
    }

    selectedUser = signal<IUser | null>(null);

    borrarUsuario(id: number): void {
        this.httpCliente.delete(`${this.apiUrl}/${id}`).subscribe({
            next: () => {
                const updatedUsers = this.usersResponse().filter(user => user.id !== id);
                this.usersResponse.set(updatedUsers);
            },
            error: (error) => {
                this.mensajeError.set({
                    error: error?.message || 'Error al borrar el usuario'
                });
            }
        });
    }
}