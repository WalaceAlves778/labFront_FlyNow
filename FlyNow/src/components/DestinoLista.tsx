interface Destino {
  id: string;
  cidade: string;
  pais: string;
  preco: number;
  data: string;
  descricao?: string;
  imagem?: string;
}

interface DestinoListaProps {
  destinos: Destino[];
}

export default function DestinoLista({ destinos }: DestinoListaProps) {
  if (destinos.length === 0) {
    return (
      <section className="destino-lista">
        <p>Nenhum destino disponível.</p>
      </section>
    );
  }

  return (
    <section className="destino-lista">
      <h2>Destinos Cadastrados</h2>
      <ul>
        {destinos.map((destino) => (
          <li key={destino.id} className="destino-item">
            {destino.imagem && (
              <img
                src={destino.imagem}
                alt={destino.cidade}
                className="destino-img"
                loading="lazy"
              />
            )}
            <div className="destino-info">
              <strong>{destino.cidade}, {destino.pais}</strong>
              <span>R$ {destino.preco.toFixed(2)}</span>
              <span>{destino.data}</span>
              {destino.descricao && (
                <p className="destino-desc">{destino.descricao}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
