# Contrato da API (Java REST)

**Status: nenhum contrato confirmado.** O app usa apenas dados de demonstração (`src/data`, acessados via `src/services`) até que o grupo responsável pela API entregue o contrato real.

Regra: nada deve ser implementado no app contra um endpoint que não esteja listado aqui como **confirmado**.

## Informações a obter do grupo da API

- URL base (desenvolvimento e produção) e versionamento.
- Autenticação: formato de login/cadastro, tipo de token, expiração, renovação.
- Formato padrão de erros e códigos HTTP.
- Paginação, filtros e ordenação das listagens.
- Upload/download de arquivos e imagens dos assets.

## Endpoints

| Recurso | Método e caminho | Requisição | Resposta | Status |
|---|---|---|---|---|
| (nenhum) | | | | a confirmar |

## Modelos

Os campos abaixo só entram aqui quando confirmados pela API.

- Asset: a confirmar
- Usuário: a confirmar
- Pedido/Carrinho: a confirmar

---

# Guia de integração (trocar mocks pela API)

## O que o app espera hoje

O app foi montado com estes dados de demonstração; o contrato real pode ser diferente e o app se adapta a ele, não o contrário.

- **Asset** (`src/data/mockAssets.js`): `id`, `title`, `categoryId`, `price` (número), `description`. Ainda não há imagem do asset no mock; o `AssetCard` aceita uma imagem (`image`).
- **Categoria** (`src/constants/categories.js`): `id`, `name`, mais `x` e `y` (posição do rótulo no mapa, que é só visual e fica no app).
- **Sessão/usuário, pedidos, produtos publicados:** nada implementado.

## O que pedir ao grupo de Java

| Funcionalidade no app | O que precisa existir na API |
|---|---|
| Lista de assets por categoria e busca | Listagem com filtro por categoria e por texto; campos do asset; paginação. |
| Detalhe do asset | Consulta por id; resposta de erro quando não existe (hoje o app mostra "Asset não encontrado."). |
| Categorias do mapa | Lista de categorias (ou confirmação de que são fixas no app). |
| Login e cadastro | Endpoints de cadastro e login; formato do token; regras de e-mail e senha. |
| Meus Dados | Consulta e atualização de perfil (nome, e-mail, link) e envio de foto. |
| Cadastro de Produto | Criação de asset (título, descrição, preço, imagem). O app já escolhe a imagem da galeria (`expo-image-picker`, componente `ImageField`); falta definir o formato do envio (multipart ou outro), tamanho máximo e tipos aceitos. Não há estoque: são produtos digitais. |
| Carrinho e compra | Se o carrinho é só local ou também no servidor; criação de pedido; pagamento. |
| Meus Pedidos | Listagem dos pedidos do usuário. |
| Erros | Formato padrão (status e mensagem), para exibir ao usuário. |

## Passo a passo para integrar

1. Registrar os endpoints e modelos confirmados nas tabelas acima (marcar o status como confirmado).
2. Definir a URL base em `.env.local` (`EXPO_PUBLIC_API_URL=...`, ver `.env.example`). Nunca colocar segredos em variáveis `EXPO_PUBLIC_*`: elas ficam visíveis no app.
3. Em dispositivo real, a API local precisa ser acessível pela rede (use o IP do computador, não `localhost`).
4. Alterar **somente** `src/services/assetService.js`: manter os nomes e as assinaturas `getAssets({ categoryId, query })` e `getAssetById(id)` e trocar o corpo por chamadas `fetch` à API. Se o formato da API for diferente do mock, converter a resposta dentro do serviço para o formato que as telas já usam. Erros devem virar `throw new Error('mensagem para o usuário')`, pois as telas mostram `error.message` e oferecem "Tentar de novo".
5. Remover `src/data/mockAssets.js` quando nada mais o usar.
6. Para login/cadastro, perfil, produtos e pedidos: criar serviços novos em `src/services/` e só então habilitar os botões hoje desabilitados (Entrar, Cadastrar, Salvar, Publicar Produto, Finalizar compra), tratando carregamento, erro e sucesso reais. Guardar o token em `expo-secure-store` (instalar com `npx expo install`).
7. Ajustar `src/utils/validators.js` às regras da API.
8. Testar em cada etapa: `npm run lint`, `npx expo-doctor` e o fluxo no Expo Go.
