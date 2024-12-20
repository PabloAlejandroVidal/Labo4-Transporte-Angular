import { Pipe, PipeTransform } from '@angular/core';
import { Chofer } from '../../../services/transporte.service';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'filtroPorNombre',
})
export class FiltroPorNombrePipe implements PipeTransform {

  transform(choferesDataSource: MatTableDataSource<any>, filtro: string, choferes: Chofer[]): MatTableDataSource<any> {

    if (choferes){
      choferesDataSource.data = choferes.filter((chofer)=>{
        return chofer.nombre.toLowerCase().includes(filtro.toLowerCase());
      });
      return choferesDataSource;
    }
    const dataSource = new MatTableDataSource<any>([]);
    dataSource.paginator = choferesDataSource.paginator;
    dataSource.sort = choferesDataSource.sort;
    dataSource.data = choferesDataSource.data.filter((chofer)=>{
      return chofer.nombre.toLowerCase().includes(filtro.toLowerCase());
    });
  return dataSource;
  }

}
