/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2024
 *
 * @author: Diego Valencia [10/10/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
**/

import { grantIds } from './constants'
import ExcelJS from 'exceljs'
import { PDFDocument } from 'pdf-lib'
import saveAs from 'save-as'
import pdfMake from 'pdfmake/build/pdfmake'
import 'pdfmake/build/vfs_fonts'

class Utils {
  static getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }

  static grantRemove(microFrontEndTag) {
    let elements = document.querySelectorAll('div[data-grant]')
    Array.from(elements).map(item => {
      let find = grantIds.filter(id => `${id}${microFrontEndTag}` == item.id)
      if (find.length > 0) {
        item.style.display = 'block'
      } else {
        item.remove()
      }
    })
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static getExcelTemplate({
    workbookName = 'template',
    worksheetName = 'sheet1',
    columns = [{ header: 'CLIENTE', key: 'v', width: 45, height: 40 }],
    rows = [],
    columnsArray = null,
    downloadExcel = true,
  }) {
    let wb = new ExcelJS.Workbook()
    workbookName = `${workbookName}.xlsx`

    let ws = wb.addWorksheet(worksheetName, {
      properties: {
        tabColor: { argb: 'FFFF0000' }
      }
    })

    ws.columns = columns
    if (!columnsArray) {
      columnsArray = []
      for (var i = 65; i <= 90; i++) {
        columnsArray.push(String.fromCharCode(i))
      }
    }

    columnsArray.forEach((element, index) => {
      if (columns[index]) {
        ws.getCell(`${element}1`).value = columns[index].header
        ws.getCell(`${element}1`).style = columns[index].style
          ? columns[index].style
          : this.excelJSCommonHeader()
      }
    })

    rows.forEach((row, rindex) => {
      let keys = Object.keys(row)
      keys.forEach((rowInside, cellPosition) => {
        ws.getCell(`${columnsArray[cellPosition]}${rindex + 2}`).value =
          row[rowInside]
        ws.getCell(`${columnsArray[cellPosition]}${rindex + 2}`).style =
          this.excelJSCommonColumn()
      })
    })

    if (downloadExcel) {
      wb.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          workbookName
        )
      })
    } else {
      return wb.xlsx.writeBuffer()
    }
  }

  static async generatePDFFromExcelData({
    workbookName = 'template',
    worksheets = [],
    downloadPDF = true,
    returnBuffer = false,
    pageSize = 'A4',
    pageOrientation = 'landscape',
    columnWidths = [],
    footer,
    footerInAll = 'all'
  }) {
    const pdfDefinition = {
      pageSize,
      pageOrientation,
      content: [],
      footer: (currentPage, pageCount) => {
        let footTmp = null

        if (footerInAll === 'all') {
          footTmp = footer
        } else if (currentPage + 1 === pageCount && footerInAll === 'last') {
          footTmp = footer
        } else if (currentPage === 0 && footerInAll === 'init') {
          footTmp = footer
        } else if (currentPage === footerInAll) {
          footTmp = footer
        }

        return footTmp
      }
    }

    const wb = new ExcelJS.Workbook()

    worksheets.forEach((sheetData, i) => {
      const tableBody = []
      for (const row of sheetData.rows) {
        const rowData = sheetData.columns.map(col => {
          const cellData = row[col.key] || ''

          if (cellData.images && Array.isArray(cellData.images)) {
            return {
              columns: cellData.images.map(img => ({
                image: img.img,
                width: img.width,
                height: img.height,
                alignment: img.alignment ? img.alignment : 'center',
                margin: img.margin || [0, 0, 0, 0]
              })),
              alignment: cellData.alignment ? cellData.alignment : 'center',
              valign: cellData.valign ? cellData.valign : 'middle',
              margin: cellData.margin || [0, 0, 0, 0]
            }
          } else if (typeof cellData === 'object' && cellData.img) {
            return {
              image: cellData.img,
              width: cellData.width,
              height: cellData.height,
              alignment: cellData.alignment ? cellData.alignment : 'center',
              valign: cellData.valign ? cellData.valign : 'middle',
              margin: cellData.margin || [0, 0, 0, 0]
            }
          } else if (typeof cellData === 'object' && cellData.link) {
            return {
              text: cellData.linkText,
              link: cellData.link,
              style: 'tableCell',
              noWrap: false,
              alignment: cellData.alignment ? cellData.alignment : 'center',
              valign: cellData.valign ? cellData.valign : 'middle',
              margin: cellData.margin || [0, 0, 0, 0]
            }
          } else if (cellData.text) {
            return {
              text: cellData.text,
              style: 'tableCell',
              noWrap: false,
              alignment: cellData.alignment ? cellData.alignment : 'center',
              fillColor: cellData.color || '#FFF',
              color: cellData.colorText || '#333',
              valign: cellData.valign ? cellData.valign : 'middle',
              margin: cellData.margin || [0, 0, 0, 0]
            }
          } else {
            return { text: cellData, style: 'tableCell', noWrap: false }
          }
        })

        tableBody.push(rowData)
      }

      const totalColumns = sheetData.columns.length
      let widths = []
      if (columnWidths.length === totalColumns) {
        widths = columnWidths
      } else {
        widths = Array(totalColumns)
          .fill('*')
          .map((value, index) => `${100 / totalColumns}%`)
      }

      const tableHeader = sheetData.columns.map(col => {
        return {
          text: col.header,
          style: 'tableHeader',
          fillColor: col.color || '#CCCCCC',
          color: col.colorText || '#333',
          alignment: col.alignment ? col.alignment : 'center',
          valign: col.valign ? col.valign : 'middle',
          margin: col.margin || [0, 0, 0, 0]
        }
      })

      const table = {
        table: {
          headerRows: 1,
          widths: widths,
          body: [tableHeader, ...tableBody]
        }
      }

      pdfDefinition.content.push(
        { text: sheetData.worksheetName, style: 'header' },
        table
      )
      if (i < worksheets.length - 1) {
        pdfDefinition.content.push({ text: '', pageBreak: 'after' })
      }
    })

    if (downloadPDF) {
      let pdfBlob = await new Promise((resolve, reject) => {
        pdfMake.createPdf(pdfDefinition).getBlob(blob => {
          resolve(blob)
        })
      })

      if (returnBuffer) {
        pdfBlob.name = workbookName
        return pdfBlob
      } else {
        saveAs(pdfBlob, `${workbookName}.pdf`)
      }
    } else {
      return pdfDefinition
    }
  }

  static async getExcelTemplateManySheets({
    workbookName = 'template',
    worksheets = [
      {
        worksheetName: 'sheet1',
        columns: [{ header: 'CLIENTE', key: 'v', width: 45, height: 40 }],
        rows: [],
        columnsArray: null
      }
    ],
    downloadExcel = true,
    getWorkbook = false,
    workbook = null
  }) {
    let wb = new ExcelJS.Workbook()
    workbookName = `${workbookName}.xlsx`

    worksheets.forEach(sheetData => {
      let ws = wb.addWorksheet(sheetData.worksheetName, {
        properties: {
          tabColor: { argb: 'FF833177' }
        }
      })

      ws.columns = sheetData.columns
      let columnsArray = sheetData.columnsArray || []

      if (columnsArray.length === 0) {
        for (var i = 65; i <= 90; i++) {
          columnsArray.push(String.fromCharCode(i))
        }
      }

      columnsArray.forEach((element, index) => {
        if (sheetData.columns[index]) {
          ws.getCell(`${element}1`).value = sheetData.columns[index].header
          ws.getCell(`${element}1`).style = sheetData.columns[index].style
            ? sheetData.columns[index].style
            : this.excelJSCommonHeader()
        }
      })

      sheetData.rows.forEach((row, rindex) => {
        let keys = Object.keys(row)
        keys.forEach((rowInside, cellPosition) => {
          ws.getCell(`${columnsArray[cellPosition]}${rindex + 2}`).value =
            row[rowInside]
          ws.getCell(`${columnsArray[cellPosition]}${rindex + 2}`).style =
            this.excelJSCommonColumn()
        })
      })
    })

    if (downloadExcel && !getWorkbook) {
      const buffer = await wb.xlsx.writeBuffer()
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        workbookName
      )
    } else if (downloadExcel && workbook) {
      const buffer = await workbook.xlsx.writeBuffer()
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        workbookName
      )
    } else if (getWorkbook) {
      return wb;
    } else {
      return await wb.xlsx.writeBuffer()
    }
  }

  static async convertExcelToPDF(
    excelBuffer,
    pageWidth = 596,
    pageHeight = 842
  ) {
    const wb = new ExcelJS.Workbook()
    await wb.xlsx.load(excelBuffer)

    const pdfDoc = await PDFDocument.create()

    for (let i = 1; i <= wb.worksheets.length; i++) {
      const ws = wb.getWorksheet(i)
      const pdfPage = pdfDoc.addPage()
      let pageSize = { width: pageWidth, height: pageHeight }

      if (ws.pageSetup && ws.pageSetup.paperSize) {
        pageSize.width = ws.pageSetup.paperSize.width
        pageSize.height = ws.pageSetup.paperSize.height
      }

      pdfPage.setSize(pageSize.width, pageSize.height)

      const excelPdfBytes = await ws._toPdfDoc()
      const embeddedExcel = await pdfDoc.embedPdf(excelPdfBytes)
      pdfPage.drawImage(embeddedExcel, {
        x: 50,
        y: pageSize.height - 50,
        width: 500,
        height: 400
      })
    }

    const pdfBytes = await pdfDoc.save()

    return pdfBytes
  }

  static excelJSCommonHeader() {
    return {
      font: {
        bold: true,
        name: 'Arial',
        color: { argb: 'FFFFFFFF' }
      },
      alignment: {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true
      },
      border: {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FF833177'
        },
        bgColor: {
          argb: 'FFFFFFFF'
        }
      }
    }
  }

  static excelJSCommonColumn() {
    return {
      font: {
        bold: false,
        name: 'Arial',
        color: { argb: 'FF000000' }
      },
      alignment: {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true
      },
      border: {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
      }
    }
  }

  static replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace)
  }

  static formatDateToSpanish(date) {
    const daysOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ]
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]

    const dayName = daysOfWeek[date.getDay()]
    const day = date.getDate()
    const monthName = months[date.getMonth()]
    const year = date.getFullYear()

    return `${dayName} ${day} de ${monthName} ${year}`
  }

  static async getBase64FromImage(imagePath) {
    async function convertSvgToPng(svgBlob) {
      const svgUrl = URL.createObjectURL(svgBlob);
      const img = new Image();

      return new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              URL.revokeObjectURL(svgUrl);
              resolve(blob);
            },
            'image/png',
            1
          );
        };
        img.onerror = reject;
        img.src = svgUrl;
      });
    }

    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;

        if (blob.type === 'image/svg+xml') {
          convertSvgToPng(blob)
            .then((pngBlob) => reader.readAsDataURL(pngBlob))
            .catch((error) => reject(error));
        } else {
          reader.readAsDataURL(blob);
        }
      });
    } catch (error) {
      console.error('Error al obtener base64 desde la imagen:', error);
      throw error;
    }
  }
}

export default Utils
