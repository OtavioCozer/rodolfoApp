import {
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  SaveDialogOptions,
} from 'electron';
import * as fs from 'fs';
import {
  AlignmentType,
  convertMillimetersToTwip,
  Document,
  IStylesOptions,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  UnderlineType,
  WidthType,
} from 'docx';

const styles: IStylesOptions = {
  paragraphStyles: [
    {
      id: 'header',
      name: 'header',
      basedOn: 'Normal',
      next: 'Normal',
      quickFormat: true,
      run: {
        bold: true,
        size: 12 * 2,
      },
      paragraph: {
        alignment: AlignmentType.CENTER,
        spacing: {
          after: convertMillimetersToTwip(2.8),
        },
      },
    },
  ],
};

export async function handleFileSave(
  event: IpcMainInvokeEvent,
  form: { [key: string]: string }
) {
  const optionMap = { '1': 'admissao', '2': 'evolucao', '3': 'intercorrencia' };
  const seconds = new Date().getTime() / 1000;
  const name = optionMap[form.option] + seconds.toFixed(0);
  const { option } = form;
  const options: SaveDialogOptions = {
    defaultPath: name,
    filters: [{ name: 'Documento Word (.docx)', extensions: ['docx'] }],
  };

  const { canceled, filePath } = await dialog.showSaveDialog(options);
  if (canceled || filePath === undefined) {
    return;
  }

  let doc: Document;
  if (option === '1') {
    doc = new Document({
      styles,
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              style: 'header',
              children: [
                new TextRun({
                  text: 'SECRETARIA ESTADUAL DE SAÚDE DE PERNAMBUCO',
                }),
              ],
            }),
            new Paragraph({
              style: 'header',
              children: [new TextRun({ text: 'INVESTIGAÇÃO DE ÓBITOS' })],
            }),
            new Paragraph({
              style: 'header',
              children: [new TextRun({ text: 'FICHA DE ADMISSÃO' })],
            }),
          ],
        },
        {
          children: [
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(`Nome do Paciente: ${form.nomePaciente}`),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(`Data de Admissão: ${form.dataAdmissao}`),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph(`Data do Óbito: ${form.dataObito}`),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(
                          `Data de Nascimento: ${form.dataNascimento}`
                        ),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph(
                          `Paciente recebido de: ${form.pacienteRecebido}`
                        ),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(`Comorbidades: ${form.comorbidades}`),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(
                          `Município de Residência: ${form.municipioResidencia}`
                        ),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(
                          `Hospital de Admissão: ${form.hospitalAdmissao}`
                        ),
                      ],
                    }),
                    new TableCell({
                      children: [new Paragraph(`Município: ${form.municipio}`)],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'RESUMO DA ADMISSÃO',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.resumo })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'HIPÓTESES DIAGNÓSTICAS DA ADMISSÃO',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.hipoteses })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'CONDUTAS DA ADMISSÃO',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.condutas })],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });
  } else if (option === '2') {
    console.log('enteri');
    doc = new Document({
      styles,
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              style: 'header',
              children: [
                new TextRun({
                  text: 'SECRETARIA ESTADUAL DE SAÚDE DE PERNAMBUCO',
                }),
              ],
            }),
            new Paragraph({
              style: 'header',
              children: [new TextRun({ text: 'INVESTIGAÇÃO DE ÓBITOS' })],
            }),
            new Paragraph({
              style: 'header',
              children: [new TextRun({ text: 'FICHA DE EVOLUÇÃO' })],
            }),
          ],
        },
        {
          children: [
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(`Nome do Paciente: ${form.nomePaciente}`),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(`Data de Evolução: ${form.dataEvolucao}`),
                      ],
                    }),
                    new TableCell({
                      children: [new Paragraph(`Turno: ${form.turno}`)],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'HIPÓTESES DIAGNÓSTICAS',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.hipoteses })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'MEDICAÇÕES E DISPOSITIVOS EM USO',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.medicacoes })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'EVOLUÇÃO MÉDICA',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.evolucao })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'EXAME FÍSICO',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.exame })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'LAB E EXAMES DE IMAGEM',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.lab })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'CONDUTAS',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.condutas })],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });
  } else if (option === '3') {
    doc = new Document({
      styles,
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              style: 'header',
              children: [
                new TextRun({
                  text: 'SECRETARIA ESTADUAL DE SAÚDE DE PERNAMBUCO',
                }),
              ],
            }),
            new Paragraph({
              style: 'header',
              children: [new TextRun({ text: 'INVESTIGAÇÃO DE ÓBITOS' })],
            }),
            new Paragraph({
              style: 'header',
              children: [new TextRun({ text: 'FICHA DE INTERCORRÊNCIAS' })],
            }),
          ],
        },
        {
          children: [
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(`Nome do Paciente: ${form.nomePaciente}`),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(
                          `Data de Intercorrência: ${form.dataIntercorrencia}`
                        ),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph(
                          `Hora da Intercorrência: ${form.horaIntercorrencia}`
                        ),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'RESUMO DA INTERCORRÊNCIA',
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: form.resumo })],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });
  }

  databse();

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(filePath, buffer);
  });
}

function databse() {
  const sqlite3 = require('sqlite3').verbose();

  // open database in memory
  const db = new sqlite3.Database(
    'C:UsersotaviOneDriveÁrea de Trabalho',
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    }
  );

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
