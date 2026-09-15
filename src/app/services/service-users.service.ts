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

    getUsers(): void {
        this.httpCliente.get<any[]>(this.apiUrl).subscribe({
            next: (response) => {
                const users: IUser[] = response.map((user) => {
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

                this.usersResponse.set(users);
            },
            error: (error) => {
                this.mensajeError.set({
                    error: error?.message || 'Error al obtener los usuarios'
                });
            }
        });
    }
}