# Pixel Hunter

Aplicativo mobile de marketplace de assets digitais (pixel art) para desenvolvedores indie, inspirado na Unity Asset Store, com identidade visual própria. Projeto acadêmico: este repositório é o front-end; a API REST em Java é desenvolvida por outra parte do grupo.

**Stack:** React Native, JavaScript e Expo (SDK 58), com React Navigation. Não usa TypeScript.

## Como rodar

Requisitos: Node.js e o app **Expo Go** no celular (celular e computador na mesma rede Wi-Fi).

```bash
npm install
npx expo start
```

Escaneie o QR code com o Expo Go. Se a rede bloquear a conexão (comum em Wi-Fi de faculdade), use `npx expo start --tunnel`.

Verificações:

```bash
npm run lint        # ESLint (npx expo lint)
npx expo-doctor     # dependências e configuração
```

Instale dependências sempre com `npx expo install <pacote>`, para obter versões compatíveis com o SDK.

## Estrutura

```
App.js                entrada: fontes, CartProvider e NavigationContainer
src/
  components/         componentes reutilizáveis (Button, TextField, Card, AssetCard...)
  constants/          tema (cores, fonte, efeitos), categorias, imagens, dados de atendimento
  context/            estado global (carrinho)
  data/               dados de DEMONSTRAÇÃO (mocks)
  pages/              telas
  routes/             navegação (pilha única) e tema do React Navigation
  services/           acesso a dados; único ponto de contato com a futura API
  utils/              validadores, formatação, horário de atendimento, layout de imagem
assets/images/        imagens fornecidas pelo grupo (mapa de fundo)
docs/api-contract.md  contrato da API e guia de integração
```

Regras do projeto estão em [CLAUDE.md](CLAUDE.md) (e [AGENTS.md](AGENTS.md)).

## Telas e estado atual

| Tela | Estado |
|---|---|
| Início (Home) | Campos de login; **Entrar desabilitado** (falta contrato de autenticação). "Explorar lojas" é um atalho provisório para o menu. |
| Cadastro | Formulário com validação; o envio ainda não existe (avisa que aguarda a API). |
| Mapa de Lojas (menu principal) | Busca, configurações, carrinho com contador e categorias sobre o mapa. Funciona com mocks. |
| Lista de assets (categoria/busca) | Busca por título, descrição e categoria, sem diferenciar acentos nem maiúsculas. Funciona com mocks; trata carregamento, erro e lista vazia. |
| Detalhe do asset | Funciona com mocks; adiciona/remove do carrinho. |
| Carrinho | Funciona localmente (em memória). **Finalizar compra desabilitado.** |
| Configurações | Navegação para as demais telas. |
| Meus Dados | Foto de perfil escolhida da galeria (recorte quadrado), guardada só em memória; Salvar apenas valida e nada é enviado. |
| Meus Pedidos | Vazio: pedidos virão da API. |
| Atendimento ao Cliente | Telefones, status ONLINE/OFFLINE calculado pelo horário de Brasília; **Enviar e-mail desabilitado** até definir o endereço. |
| Cadastro de Produto | Formulário com escolha de imagem da galeria (com prévia) e validação; **Publicar apenas valida**, o envio da imagem depende da API. |

Nenhuma operação simula sucesso: o que depende da API fica desabilitado ou avisa que ainda não está disponível.

## Pendências conhecidas

- Contrato da API Java (ver `docs/api-contract.md`).
- E-mail de atendimento em `src/constants/support.js` (`email: null`); os telefones vieram do frame de design e devem ser confirmados.
- O carrinho não é persistido: some ao fechar o app.
- Regras de validação (ex.: senha com no mínimo 6 caracteres) são provisórias e devem seguir a API.
- Ícones são do Ionicons (provisórios); logotipo e demais imagens são colocados manualmente pelo grupo.
- `LICENSE` é o do template do Expo; trocar pela licença do grupo, se houver.
- `npm audit` aponta vulnerabilidades em ferramentas de linha de comando do Expo (não no código do app). Não use `npm audit fix --force`: ele tentaria instalar uma versão antiga do Expo e quebraria o projeto.

## Integração com a API

Veja o guia em [docs/api-contract.md](docs/api-contract.md).
