import { useState, FormEvent } from 'react';

interface ContatoForm {
  nome: string;
  email: string;
  mensagem: string;
}

export default function Contato() {
  const [form, setForm] = useState<ContatoForm>({
    nome: '',
    email: '',
    mensagem: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Simulação de envio: apenas exibe os dados no console/alerta
    // Não grava em API — apenas demonstra estado controlado no front
    window.alert('Mensagem enviada (simulação):\n' + JSON.stringify(form, null, 2));

    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);

    // Limpa o formulário após o envio simulado
    setForm({ nome: '', email: '', mensagem: '' });
  };

  return (
    <section className="contato">
      <h2>Fale Conosco</h2>

      {enviado && (
        <p className="sucesso">Mensagem enviada com sucesso! (simulação)</p>
      )}

      <form onSubmit={handleSubmit} className="contato-form">
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            required
            data-hint="Seu nome completo, para identificar o contato."
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
            data-hint="Seu endereço de e-mail, para enviarmos a resposta."
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensagem">Mensagem / Destino de interesse</label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            placeholder="Ex: Gostaria de saber mais sobre pacotes para o Rio de Janeiro"
            rows="4"
            required
            data-hint="Escreva sua dúvida ou qual destino deseja conhecer."
          />
        </div>

        <button type="submit" className="btn-submit">
          Enviar
        </button>
      </form>
    </section>
  );
}
