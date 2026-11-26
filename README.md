# HT System — Segurança Eletrônica

Site institucional da HT System, desenvolvido em HTML, CSS e JavaScript. Layout responsivo para computadores e celulares.

## Recursos

- Apresentação dos serviços de segurança eletrônica.
- Venda e locação de equipamentos e armários inteligentes.
- Planos de manutenção preventiva e preventiva com seguro.
- Botões com mensagens específicas para o WhatsApp.
- Formulário que prepara uma solicitação no WhatsApp.
- Marcas com efeitos de cor ao passar o mouse ou navegar pelo teclado.

## Visualizar localmente

Abra o arquivo `index.html` no navegador. Para usar um servidor local, execute na pasta do projeto:

```sh
python3 -m http.server 8080
```

Depois, acesse http://localhost:8080.

## Arquivos

- `index.html`: conteúdo e estrutura do site.
- `styles.css`: estilos e adaptação para diferentes tamanhos de tela.
- `app.js`: menu, navegação e mensagens do WhatsApp.
- `assets/`: imagens e ícone do site.

## Hospedagem

Os arquivos podem ser publicados em qualquer hospedagem de sites estáticos. Não há instalação de dependências nem etapa de compilação.

As fontes DM Sans e Manrope são carregadas pelo Google Fonts, com fontes alternativas quando o serviço não estiver disponível.

## Atendimento

- WhatsApp: +55 11 94755-2426
- E-mail: htsystemalarmes@gmail.com
- Instagram: https://www.instagram.com/htsystemseguranca/

O formulário abre uma conversa no WhatsApp. Ele não armazena solicitações nem confirma agendamentos automaticamente; os detalhes são combinados com a equipe.

## Imagens

A fotografia de câmeras é ilustrativa: Zulfugar Karimov / Unsplash — https://unsplash.com/photos/XIFc1W25QsI. O material de identidade visual foi fornecido como referência para este projeto. O armário é representado por um diagrama feito em CSS.

## Carrossel de soluções

A abertura do site contém cinco cenas: câmeras instaladas, leitura de placas (LPR), linha virtual, reconhecimento facial e portaria VoIP. O carrossel permite seleção manual, teclado e deslize no celular. A reprodução automática pode ser pausada e respeita a preferência por movimento reduzido.

As quatro novas imagens são cenas demonstrativas geradas com aparência fotográfica; não representam obras ou clientes reais. Os sinais de alarme, identificação e abertura da cancela são simulações visuais em CSS, sem conexão a equipamentos. Os prompts e arquivos estão documentados em `docs/carousel-scenes.md`.
