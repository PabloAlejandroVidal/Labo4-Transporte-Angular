import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Chofer, Vehiculo } from './transporte.service';
import { HasLicenciaProfesionalPipe } from '../pages/choferes/pipes/has-licencia-profesional.pipe';
import { Countries, Country } from './country.service';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {}

  async generatePdf(data: Chofer, paises: Countries): Promise<void> {
    const doc = new jsPDF();

    // Encabezado
    doc.text(`Reporte de ${data.nombre}`, 10, 10);

    const banderaBase64 = paises[data.nacionalidad].flag; // Imagen en formato Base64

    // Esperar a que la imagen esté completamente cargada
    const imageDimensions = await this.getImageDimensions(banderaBase64);

    // Contenido de la tabla
    doc.autoTable({
      head: [['DNI', 'Nombre', 'Edad', 'Nacionalidad', 'Nro Licencia', 'Licencia Profesional', 'Bandera']],
      body: [
        [
          data.dni,
          data.nombre,
          data.edad,
          data.nacionalidad,
          data.nroLicencia,
          data.licencia ? 'Sí' : 'No',
          '',
        ],
      ],
      didDrawCell: (hookData: any) => {
        // Dibujar la imagen en la celda de la columna "Bandera"
        if (hookData.section === 'body' && hookData.column.index === 6 && banderaBase64) {
          const x = hookData.cell.x + 2; // Posición x dentro de la celda
          const y = hookData.cell.y + 2; // Posición y dentro de la celda
          const maxHeight = hookData.cell.height - 4; // Máximo alto permitido

          const ratio = imageDimensions.height / maxHeight;
          const finalWidth = imageDimensions.width / ratio;

          const x2 = hookData.cell.x + hookData.cell.width - finalWidth -2;

          // Agregar la imagen con las dimensiones ajustadas
          doc.addImage(banderaBase64, 'JPEG', x2, y, finalWidth, maxHeight);
        }
      },
    });

    // Guardar el archivo PDF
    doc.save(`${data.nombre}-${data.nroLicencia}.pdf`);
  }

  // Función para obtener las dimensiones de la imagen
  private getImageDimensions(base64: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
    });
  }

  async generateVehiculosPdf(choferes: Vehiculo[]): Promise<void> {
    const doc = new jsPDF();

    // Encabezado del PDF
    doc.setFontSize(18);
    doc.text('Reporte de Choferes', 10, 10);

    // Configuración para la tabla
    const tableBody = await Promise.all(
      choferes.map(async (Vehiculo) => {
        // Retornar la fila con los datos del Vehiculo
        return [
          Vehiculo.nombre,
          Vehiculo.tipo === 'aereo' && "Aéreo" ||
          Vehiculo.tipo === 'maritimo' && "Marítimo" ||
          Vehiculo.tipo === 'terrestre' && "Terrestre" ,
          Vehiculo.ruedasCantidad,
          Vehiculo.capacidadPromedia,
        ];
      })
    );

    doc.autoTable({
      head: [['Nombre', 'Tipo', 'Ruedas', 'Capacidad Promedia']],
      body: tableBody,
    });

    // Guardar el PDF
    doc.save('reporte-vehiculos.pdf');
  }


  async generateChoferesPdf(choferes: Chofer[], paises: Countries): Promise<void> {
    const doc = new jsPDF();

    // Encabezado del PDF
    doc.setFontSize(18);
    doc.text('Reporte de Choferes', 10, 10);

    // Configuración para la tabla
    const tableBody = await Promise.all(
      choferes.map(async (chofer) => {
        const banderaBase64 = paises[chofer.nacionalidad].flag; // Supongamos que esta es una URL o base64.
        const banderaImg = banderaBase64
          ? await this.loadImageBase64(banderaBase64)
          : null;

        // Retornar la fila con los datos del chofer
        return [
          chofer.dni,
          chofer.nombre,
          chofer.edad,
          chofer.nacionalidad,
          chofer.nroLicencia,
          chofer.licencia ? 'Sí' : 'No',
          banderaImg || 'No disponible', // Placeholder si no hay imagen
        ];
      })
    );

    doc.autoTable({
      head: [['DNI', 'Nombre', 'Edad', 'Nacionalidad', 'Nro Licencia', 'Lic. Profesional', 'Bandera']],
      body: tableBody,
      didDrawCell: (hookData: any) => {
        if (hookData.column.index === 6 && hookData.row.raw[6] instanceof HTMLImageElement) {
          const banderaImg = hookData.row.raw[6];

          const x = hookData.cell.x + 2; // Posición x dentro de la celda
          const y = hookData.cell.y + 2; // Posición y dentro de la celda
          const maxHeight = hookData.cell.height - 4; // Máximo alto permitido
          const maxWidth = hookData.cell.width - 4; // Máximo alto permitido

          const ratio = banderaImg.width / maxWidth;
          const finalHeight = banderaImg.height / ratio;

          const x2 = hookData.cell.x + hookData.cell.width - maxWidth -2;

          // Agregar la imagen con las dimensiones ajustadas
          doc.addImage(banderaImg, 'JPEG', x2, y, maxHeight * 1.7, maxHeight);
        }
      },
    });

    // Guardar el PDF
    doc.save('reporte-choferes.pdf');
  }

  /**
   * Cargar imagen desde una URL o Base64 y ajustarla al aspect ratio.
   * @param imageUrl URL o Base64 de la imagen
   * @returns HTMLImageElement ajustado
   */
  private loadImageBase64(imageUrl: string): Promise<HTMLImageElement | null> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;
      img.onload = () => {
        const maxWidth = 20; // Máximo ancho de la imagen
        const maxHeight = 10; // Máximo alto de la imagen
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);

        img.width = img.width * ratio;
        img.height = img.height * ratio;

        resolve(img);
      };
      img.onerror = () => resolve(null);
    });
  }
}
