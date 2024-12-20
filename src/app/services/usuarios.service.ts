import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { addDoc, collection, collectionData, CollectionReference, doc, docData, documentId, DocumentReference, Firestore, firestoreInstance$, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where, writeBatch } from '@angular/fire/firestore';
import { BehaviorSubject, from, map, mergeMap, Observable, of } from 'rxjs';

export type Rol = 'admin' | 'usuario';


export interface Usuario {
  nombre: string,
  apellido: string,
  email: string,
  rol: Rol;
  clave: string,
  id: string,
}

export interface UsuarioResult {
  result: {
    code: string,
    message: string,
  };
  success: boolean;
  user: Usuario | null;
}

export interface InfoResult {
  code: string,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public firestore: Firestore = inject(Firestore);

  constructor() {
    this.cargarUsuarios();
  }

  private usersCollection = collection(this.firestore, 'users');

  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$ = this.usuariosSubject.asObservable();


  registerUser(userData: {}, email: string, rol: Rol) {
    const data = {
      ...userData,
      email,
      rol,
      registrationDate: new Date(),
    } as any;
    return from(addDoc(this.usersCollection, data));
  }

  private cargarUsuarios(): void {
    // Inicia la suscripción en tiempo real
    onSnapshot(this.usersCollection, (snapshot) => {
      const usuariosList: Usuario[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Usuario[];

      // Emitir la lista actualizada a los suscriptores
      this.usuariosSubject.next(usuariosList);
    }, (error) => {
      console.error('Error al obtener usuarios:', error);
      this.usuariosSubject.next([]); // Emitir un array vacío en caso de error
    });
  }


  obtenerUsuarioPorEmail(email: string): Observable<Usuario | null> {
    return this.usuarios$.pipe(
      map((usuarios) => (usuarios.find((usuario) => usuario.email === email)) || null)
    );
  }

  private getUsuariosPorRol(rol: Rol): Observable<Usuario[]> {
    const usuariosRef = collection(this.firestore, 'users');
    const usuariosQuery = query(usuariosRef, where('rol', '==', rol));
    return collectionData(usuariosQuery, { idField: 'id' }) as Observable<Usuario[]>;
  }


}
