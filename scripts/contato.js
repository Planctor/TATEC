// Envia o formulário de contato sem sair da página e mostra enviando / enviado / erro.
// Em erro, o texto digitado fica no formulário (nada se perde).
export default function contato() {
    const form = document.querySelector('[data-contato]');
    if (!form || !window.fetch) return; // sem fetch: envio normal do formulário

    const status = form.querySelector('[data-form-status]');
    const botao = form.querySelector('[type="submit"]');

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        botao.disabled = true;
        status.dataset.estado = 'enviando';
        status.textContent = 'Enviando…';

        try {
            const resposta = await fetch(form.action, { method: 'POST', body: new FormData(form) });
            if (!resposta.ok) throw new Error(resposta.status);
            form.reset();
            status.dataset.estado = 'ok';
            status.textContent = 'Mensagem enviada! Vamos responder no email que você informou.';
        } catch {
            status.dataset.estado = 'erro';
            status.innerHTML = 'Não conseguimos enviar agora. Sua mensagem continua aqui: tente de novo ou fale pelo '
                + '<a href="https://api.whatsapp.com/send?1=pt_BR&amp;phone=5521994629747" target="_blank" rel="noopener">WhatsApp (21) 99462-9747</a>.';
        } finally {
            botao.disabled = false;
        }
    });
}
