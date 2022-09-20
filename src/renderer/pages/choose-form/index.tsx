import React, { FormEvent, FormEventHandler, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
  Input,
  TextField,
} from '@mui/material';
import './style.css';
import { width } from '@mui/system';
import { stringify } from 'querystring';

export default function ChooseForm() {
  const [option, setOption] = useState('1');
  const [form, setForm] = useState({});
  const optionMap = { '1': 'admissao', '2': 'evolucao', '3': 'intercorrencia' };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const seconds = new Date().getTime() / 1000;
      const name = optionMap[option] + seconds.toFixed(0);
      const form = new FormData(e.currentTarget);
      const cadastro = {};

      form.forEach(
        (v: FormDataEntryValue, k: string, p: FormData) => (cadastro[k] = v)
      );
      console.log(cadastro);

      window.electronAPI.saveFile(cadastro);
      e.currentTarget.reset();
    } catch (err) {
      console.log(err);
      alert('Falha no login');
    }
  }

  async function handleOptionChange(e: SelectChangeEvent) {
    e.preventDefault();
    setOption(e.target.value);
  }

  function Forms() {
    if (option === '1') {
      return (
        <div>
          <div>
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Data de Admissão"
                name="dataAdmissao"
              />
            </FormControl>
            <div style={{ width: '4%', display: 'inline-block' }} />
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Data de Óbito"
                name="dataObito"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Data de Nascimento"
                name="dataNascimento"
              />
            </FormControl>
            <div style={{ width: '4%', display: 'inline-block' }} />
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Paciente recebido de"
                name="pacienteRecebido"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                className="form-text-field"
                label="Comorbidades"
                name="comorbidades"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                className="form-text-field"
                label="Município de Residência"
                name="municipioResidencia"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Hospital da Admissão"
                name="hospitalAdmissao"
              />
            </FormControl>
            <div style={{ width: '4%', display: 'inline-block' }} />
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Município"
                name="municipio"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="RESUMO DA ADMISSÃO"
                name="resumo"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="HIPÓTESES DIAGNÓSTICAS DA ADMISSÃO"
                name="hipoteses"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="CONDUTAS DA ADMISSÃO"
                name="condutas"
              />
            </FormControl>
          </div>
        </div>
      );
    }
    if (option === '2') {
      return (
        <div>
          <div>
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Data de Evolução"
                name="dataEvolucao"
              />
            </FormControl>
            <div style={{ width: '4%', display: 'inline-block' }} />
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Turno"
                name="turno"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="HIPÓTESES DIAGNÓSTICAS"
                name="hipoteses"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="MEDICAÇÕES E DISPOSITIVOS EM USO"
                name="medicacoes"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="EVOLUÇÃO MÉDICA"
                name="evolucao"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="EXAME FÍSICO"
                name="exame"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="LAB E EXAMES DE IMAGEM"
                name="lab"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="CONDUTAS"
                name="condutas"
              />
            </FormControl>
          </div>
        </div>
      );
    }
    if (option === '3') {
      return (
        <div>
          <div>
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Data de Intercorrência"
                name="dataIntercorrencia"
              />
            </FormControl>
            <div style={{ width: '4%', display: 'inline-block' }} />
            <FormControl variant="outlined" className="double-form-control">
              <TextField
                className="form-text-field"
                label="Hora da Intercorrência"
                name="horaIntercorrencia"
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth className="form-control">
              <TextField
                multiline
                className="form-text-field"
                label="RESUMO DA INTERCORRÊNCIA"
                name="resumo"
              />
            </FormControl>
          </div>
        </div>
      );
    }
    return <p>Erro</p>;
  }

  return (
    <Box className="form-box" component="form" onSubmit={handleSubmit}>
      <FormControl variant="outlined" fullWidth className="form-control">
        <InputLabel>Formulário</InputLabel>
        <Select
          value={option}
          label="Formulário"
          name="option"
          onChange={handleOptionChange}
        >
          <MenuItem value="1">Admissão</MenuItem>
          <MenuItem value="2">Evolução</MenuItem>
          <MenuItem value="3">Intercorrência</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth className="form-control">
        <TextField
          className="form-text-field"
          label="Nome do Paciente"
          name="nomePaciente"
        />
      </FormControl>

      <Forms />

      <Button className="form-button" fullWidth type="submit">
        Salvar
      </Button>
    </Box>
  );
}
