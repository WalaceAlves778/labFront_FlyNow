import { useState, useEffect } from 'react';
import Header from './components/Header';
import DestinoForm from './components/DestinoForm';
import DestinoLista from './components/DestinoLista';
import Contato from './components/Contato';
import './components/flynow.css';

interface Destino {
  id: string;
  cidade: string;
  pais: string;
  preco: number;
  data: string;
  descricao?: string;
  imagem?: string;
}

const CIDADES = ['Rio de Janeiro', 'Buenos Aires', 'Lisboa', 'Paris'];

function gerarId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Busca extrato e thumbnail de uma página da Wikipedia
async function buscarDetalhesWikipedia(titulo: string) {
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&pithumbsize=200&titles=${encodeURIComponent(titulo)}&format=json&origin=*`
  );

  if (!res.ok) {
    throw new Error(`Wikipedia API (detalhes): ${res.status}`);
  }

  const data = await res.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  const page = pages[pageId];

  return {
    descricao: page.extract || '',
    imagem: page.thumbnail?.source,
  };
}

// Busca destinos na Wikipedia API pública
async function buscarDestinosAPI(): Promise<Destino[]> {
  const destinos: Destino[] = [];

  for (const cidade of CIDADES) {
    try {
      // 1. Busca o título da página na Wikipedia
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cidade)}&format=json&origin=*`
      );

      if (!searchRes.ok) {
        console.warn(`Wikipedia API (busca): status ${searchRes.status} para ${cidade}`);
        continue;
      }

      const searchData = await searchRes.json();
      const primeiro = searchData.query.search[0];

      if (!primeiro) {
        console.warn(`Nenhum resultado para ${cidade}`);
        continue;
      }

      // 2. Busca detalhes (extrato + imagem) da página encontrada
      const detalhes = await buscarDetalhesWikipedia(primeiro.title);

      destinos.push({
        id: `wiki-${primeiro.title}`,
        cidade,
        pais: '', // Wikipedia não retorna país diretamente neste endpoint
        preco: Math.floor(Math.random() * 1500) + 500, // preço ilustrativo (API não tem)
        data: '2026-12-01', // data ilustrativa (API não tem)
        descricao: detalhes.descricao,
        imagem: detalhes.imagem,
      });
    } catch (erro) {
      console.error(`Erro ao buscar ${cidade}:`, erro);
    }
  }

  return destinos;
}

// Tooltip que segue o cursor com o resumo do campo (data-hint)
function initTooltipFollow() {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip-follow';
  document.body.appendChild(tooltip);

  const show = (e: MouseEvent, hint: string) => {
    tooltip.textContent = hint;
    tooltip.classList.add('visible');
    const x = e.clientX + 16;
    const y = e.clientY + 16;
    tooltip.style.left = `${Math.min(x, window.innerWidth - tooltip.offsetWidth - 12)}px`;
    tooltip.style.top = `${Math.min(y, window.innerHeight - tooltip.offsetHeight - 12)}px`;
  };

  const move = (e: MouseEvent) => {
    if (!tooltip.classList.contains('visible')) return;
    const x = e.clientX + 16;
    const y = e.clientY + 16;
    tooltip.style.left = `${Math.min(x, window.innerWidth - tooltip.offsetWidth - 12)}px`;
    tooltip.style.top = `${Math.min(y, window.innerHeight - tooltip.offsetHeight - 12)}px`;
  };

  const hide = () => {
    tooltip.classList.remove('visible');
  };

  document.addEventListener('mousemove', move);

  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    const hint = target.closest('[data-hint]')?.getAttribute('data-hint');
    if (hint) {
      show(e as MouseEvent, hint);
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-hint]')) {
      hide();
    }
  });

  return () => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseover', show as any);
    document.removeEventListener('mouseout', hide as any);
    tooltip.remove();
  };
}

function App() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscarDestinosAPI()
      .then((dados) => {
        setDestinos(dados);
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err.message || 'Erro desconhecido ao carregar destinos');
        setCarregando(false);
      });
  }, []);

  useEffect(() => {
    return initTooltipFollow();
  }, []);

  const handleAddDestino = (novo: Omit<Destino, 'id'>) => {
    const destino: Destino = {
      ...novo,
      id: gerarId(),
    };
    setDestinos((atual) => [...atual, destino]);
  };

  return (
    <>
      <Header />
      <DestinoForm onAdd={handleAddDestino} />

      {carregando ? (
        <p>Carregando destinos da API...</p>
      ) : erro ? (
        <p className="erro">Erro ao carregar destinos: {erro}</p>
      ) : (
        <DestinoLista destinos={destinos} />
      )}

      <Contato />
    </>
  );
}

export default App;
