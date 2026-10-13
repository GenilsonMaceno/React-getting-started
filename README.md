# Mercadão

Loja virtual de demonstração no estilo marketplace. Tem página inicial, busca com filtros, página de produto, carrinho, checkout e favoritos.

É um projeto só de front-end: não há servidor, login, banco de dados nem pagamento real. Os produtos e preços são fictícios, e as "fotos" são emojis sobre um fundo colorido.

## Como rodar

Requer Node.js 20 ou mais recente.

```bash
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

| Comando           | O que faz                                              |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Sobe o servidor de desenvolvimento com recarga automática |
| `npm run build`   | Checa os tipos e gera a versão de produção em `dist/`  |
| `npm run preview` | Serve localmente o que foi gerado em `dist/`           |
| `npm run lint`    | Roda o ESLint em todo o projeto                        |

## Tecnologias

- **React 19** para a interface
- **TypeScript** para tipagem
- **Vite** como servidor de desenvolvimento e empacotador
- **CSS puro**, com variáveis de cor e espaçamento
- **ESLint** para padronização do código

Não há nenhuma dependência além do React. O roteamento e o estado global foram escritos à mão.

## Como foi criado

1. O ponto de partida foi o template oficial `react-ts` do Vite (`npm create vite@latest`), que já traz React, TypeScript e ESLint configurados.
2. A tela de exemplo do template foi substituída pela loja: `App.tsx`, `App.css` e `index.css` foram reescritos.
3. Os produtos foram cadastrados como uma lista fixa em `src/data/products.ts`, no lugar de um banco de dados.
4. As telas foram separadas em páginas e componentes reutilizáveis.
5. Carrinho e favoritos foram centralizados em um estado global, salvo no navegador.

Os arquivos `src/teste.tsx` e `src/teste.css` são um componente de estudo anterior à loja. Eles continuam no projeto, mas não são exibidos.

## Estrutura de pastas

```
my-app/
├── index.html              Página única que carrega o app
├── package.json            Dependências e comandos
├── vite.config.ts          Configuração do Vite
├── eslint.config.js        Regras do ESLint
├── tsconfig*.json          Configuração do TypeScript
├── public/                 Arquivos estáticos (favicon)
└── src/
    ├── main.tsx            Ponto de entrada: monta o React
    ├── App.tsx             Layout geral e escolha da página pela rota
    ├── App.css             Estilos dos componentes e páginas
    ├── index.css           Estilos base e variáveis de cor
    ├── router.ts           Roteador baseado no hash da URL
    ├── cart.ts             Cálculo de subtotal, frete e total
    ├── format.ts           Formatação de preço, desconto e regras de frete
    ├── data/
    │   └── products.ts     Lista de produtos e de categorias
    ├── store/
    │   ├── context.ts      Tipos do estado global e hook useStore()
    │   └── StoreProvider.tsx   Carrinho, favoritos e aviso de "adicionado"
    ├── components/
    │   ├── Header.tsx      Logo, busca, categorias e atalhos
    │   ├── Carousel.tsx    Banners rotativos da página inicial
    │   ├── ProductCard.tsx Cartão de produto usado nas grades
    │   ├── ProductImage.tsx    Ilustração do produto
    │   └── Footer.tsx      Rodapé
    └── pages/
        ├── Home.tsx        Página inicial
        ├── Listing.tsx     Busca e filtros
        ├── ProductPage.tsx Detalhes do produto
        ├── Cart.tsx        Carrinho
        ├── Checkout.tsx    Finalização da compra
        └── Favorites.tsx   Lista de favoritos
```

## Arquitetura

O projeto é uma SPA (single-page application): o navegador carrega um único `index.html` e o React troca o conteúdo da tela sem recarregar a página. O código é organizado por tipo de arquivo, em camadas simples.

```
index.html
   └── main.tsx
          └── StoreProvider        estado global (carrinho, favoritos)
                 └── App           lê a rota e escolhe a página
                        ├── Header
                        ├── página atual   ──usa──▶  components/
                        └── Footer                   data/products.ts
                                                     cart.ts, format.ts
```

### Roteamento

O arquivo `src/router.ts` implementa um roteador próprio que usa o hash da URL. Como tudo depois do `#` não é enviado ao servidor, o site funciona em qualquer hospedagem de arquivos estáticos, sem configuração extra.

| Rota             | Página                 |
| ---------------- | ---------------------- |
| `#/`             | Início                 |
| `#/busca`        | Busca e filtros        |
| `#/produto/:id`  | Detalhes do produto    |
| `#/carrinho`     | Carrinho               |
| `#/checkout`     | Finalização da compra  |
| `#/favoritos`    | Favoritos              |

O hook `useRoute()` devolve o caminho e os parâmetros atuais, e a função `navigate()` muda de página. O `App.tsx` compara o caminho e renderiza a página correspondente.

### Estado global

Carrinho e favoritos ficam em um contexto do React (`src/store/`). Qualquer componente acessa esses dados com o hook `useStore()`, que expõe:

- `cart`, `cartCount` e `favorites`
- `addToCart`, `setQty`, `removeFromCart` e `clearCart`
- `toggleFavorite`

O estado é gravado no `localStorage` a cada mudança, então o carrinho e os favoritos continuam lá depois de fechar o navegador. A quantidade de cada item é sempre limitada ao estoque do produto.

O contexto está dividido em dois arquivos (`context.ts` e `StoreProvider.tsx`) porque a recarga automática do Vite exige que um arquivo de componente exporte apenas componentes.

### Filtros na URL

Na página de busca, os filtros não ficam em `useState`: eles são lidos e gravados nos parâmetros da URL. Com isso o botão voltar do navegador desfaz um filtro e o link de uma busca pode ser compartilhado.

| Parâmetro | Significado                                         |
| --------- | --------------------------------------------------- |
| `q`       | Texto buscado (ignora acentos e maiúsculas)         |
| `cat`     | Categoria                                           |
| `max`     | Preço máximo                                        |
| `frete=1` | Somente frete grátis                                |
| `oferta=1`| Somente produtos com desconto                       |
| `ordem`   | `relevancia`, `menor`, `maior` ou `vendidos`        |

Exemplo: `#/busca?cat=Casa&frete=1&ordem=menor`.

### Dados

`src/data/products.ts` define o tipo `Product`, a lista de produtos e a lista de categorias. Para adicionar, remover ou alterar um produto, basta editar esse arquivo. Cada produto precisa de um `id` único.

### Regras de negócio

- **Frete:** é grátis quando todos os itens do carrinho têm frete grátis ou quando o subtotal chega a R$ 199. Caso contrário, custa R$ 19,90. Os valores estão em `src/format.ts` e o cálculo em `src/cart.ts`.
- **Parcelamento:** o preço é sempre exibido em 10x sem juros.
- **Checkout:** o pedido é simulado. Ao confirmar, o carrinho é esvaziado e um número de pedido aleatório é exibido; nada é enviado a lugar nenhum.

### Estilos

Todo o visual está em dois arquivos CSS. `index.css` define as variáveis de cor, a tipografia e o reset básico; `App.css` contém os estilos de cada componente e página, separados por comentários de seção. O layout se adapta a telas menores em dois pontos de quebra: 960px e 720px.

## Limitações e próximos passos

- Não há back-end: para virar uma loja real, a lista fixa de produtos precisa ser trocada por chamadas a uma API.
- Não há cadastro, login nem pagamento.
- Não há testes automatizados.
- O roteador próprio atende bem a seis rotas; se o projeto crescer, vale migrar para o React Router.
- No celular, os filtros da busca aparecem acima dos resultados e empurram os produtos para baixo.
