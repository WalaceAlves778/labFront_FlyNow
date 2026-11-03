import { useState, FormEvent } from 'react';

interface Destino {
  cidade: string;
  pais: string;
  preco: number;
  data: string;
}

interface DestinoFormProps {
  onAdd: (destino: Destino) => void;
}

export default function DestinoForm({ onAdd }: DestinoFormProps) {
  const [cidade, setCidade] = useState('');
  const [pais, setPais] = useState('');
  const [preco, setPreco] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!cidade || !pais || !preco || !data) {
      return;
    }

    onAdd({
      cidade,
      pais,
      preco: Number(preco),
      data,
    });

    setCidade('');
    setPais('');
    setPreco('');
    setData('');
  };

  return (
    <form onSubmit={handleSubmit} className="destino-form">
      <h2>Adicionar Destino</h2>

      <div className="form-group">
        <label htmlFor="cidade">Cidade</label>
        <input
          id="cidade"
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Ex: São Paulo"
          required
          data-hint="Digite o nome da cidade para onde deseja viajar."
        />
      </div>

      <div className="form-group">
        <label htmlFor="pais">País</label>
        <input
          id="pais"
          type="text"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          placeholder="Ex: Brasil"
          required
          data-hint="Informe o país de destino da viagem."
        />
      </div>

      <div className="form-group">
        <label htmlFor="preco">Preço (R$)</label>
        <input
          id="preco"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Ex: 500"
          required
          data-hint="Valor estimado da passagem ou pacote em reais."
        />
      </div>

      <div className="form-group">
        <label htmlFor="data">Data</label>
        <input
          id="data"
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          data-hint="Escolha a data prevista para embarque."
        />
      </div>

      <button type="submit" className="btn-submit">
        Cadastrar
      </button>
    </form>
  );
}
