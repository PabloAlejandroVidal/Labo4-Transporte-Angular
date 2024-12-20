import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { filter, from, Observable, of } from 'rxjs';

export const TiposPermitidos = ['terrestre', 'aereo', 'maritimo'] as const; // Define los valores una sola vez
export type Tipo = typeof TiposPermitidos[number]; // Genera el tipo a partir del array

export function isAllowedColor(value: any): value is Tipo {
  return TiposPermitidos.includes(value); // Usa el array directamente
}

export interface Vehiculo{
  id: string,
  nombre: string, //solo letras
  tipo: Tipo,
  ruedasCantidad: number, //maximo 6
  capacidadPromedia: number, //entre 2 y 100 pasajeros
}

export interface Chofer{
  nombre: string,
  dni: string,
  edad: number,
  nroLicencia: string,
  licencia: boolean,
  nacionalidad: string,
}

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  private firestore: Firestore = inject(Firestore);

  async agregarChofer(chofer: Chofer) {
    const choferesCollection = collection(this.firestore, 'choferes');
    return await addDoc(choferesCollection, chofer);
  }

  getChofer(choferId: string): Observable<Chofer> {
    const choferDocRef = doc(this.firestore, `choferes/${choferId}`);
    return from((getDoc(choferDocRef).then(res=>res.data() as Chofer).catch(()=>null))).pipe(filter((chofer)=>{return chofer !== null && chofer!== undefined}));
  }
  getChoferes(): Observable<Chofer[]> {
    const choferesCollection = collection(this.firestore, 'choferes');
    return collectionData(choferesCollection, {idField: 'id'}) as Observable<Chofer[]>
  }



  async agregarVehiculo(vehiculo: Vehiculo) {
    const vehiculosCollection = collection(this.firestore, 'vehiculos');
    return await addDoc(vehiculosCollection, vehiculo);
  }

  async modificarVehiculo(id: string, vehiculo: any): Promise<void> {
    const docRef = doc(this.firestore, `vehiculos/${id}`);
    return updateDoc(docRef, vehiculo);
  }

  async eliminarVehiculo(id: string): Promise<void> {
    const docRef = doc(this.firestore, `vehiculos/${id}`);
    await deleteDoc(docRef);
  }

  getvehiculo(vehiculoId: string): Observable<Vehiculo> {
    const vehiculoDocRef = doc(this.firestore, `vehiculos/${vehiculoId}`);
    return from((getDoc(vehiculoDocRef).then(res=>res.data() as Vehiculo).catch(()=>null))).pipe(filter((vehiculo)=>{return vehiculo !== null && vehiculo!== undefined}));
  }

  getVehiculos(): Observable<Vehiculo[]> {
    const vehiculosCollection = collection(this.firestore, 'vehiculos');
    return collectionData(vehiculosCollection, {idField: 'id'}) as Observable<Vehiculo[]>
  }

}
