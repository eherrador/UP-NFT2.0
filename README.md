# UP-NFT2.0
Universal Profile + LSP7 + LSP 8


## Steps
Init the project
´´´npm init´´´
Keep default values.

Install dependencies
We install erc725.js and lsp-factory.js.

npm i @erc725/erc725.js @lukso/lsp-factory.js
We will also need Web3js to generate a wallet and create a provider:

npm i web3
Install and set up TypeScript
Install TypeScript and ts-node and dotenv:

npm i -D typescript ts-node dotenv
Init TypeScript:

npx tsc --init
Enable resolveJsonModule in tsconfig.json:

"resolveJsonModule": true
Copy .env file
cp .env.example .env
