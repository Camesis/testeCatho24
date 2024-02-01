<h1 align="center">
   Candidatos Backend
</h1>

As Requisições utilizadas são POST(para a adição de candidatos) e GET(para retorno do melhor candidato de acordo com o número de habilidades correspondentes). 

## 🚀 Para começar

### Start com Docker-compose
1. Clone ou baixe este repositório 
2. Navegue para o diretório: `cd candidatos-api`
3. Copie o arquivo .env.example para .env: `cp .env.example .env`
4. Execute o docker compose: `docker-compose up`
5. O servidor será executado em: `http://localhost:3001`
6. Acesse a documentação do Swagger em: `http://localhost:3001/api-docs`

### Start sem Docker-compose
1. Clone ou baixe este repositório 
2. Navegue para o diretório: `cd candidatos-api`
3. Start seu mongodb local
4. Copie o arquivo .env.example para .env: `cp .env.example .env`
5. Altere `MONGO_URI` no arquivo .env 
6. Execute `npm ci`
7. Execute `npm run dev`
8. O servidor será executado em: `http://localhost:3001`
9. Acesse a documentação do Swagger em `http://localhost:3001/api-docs`

