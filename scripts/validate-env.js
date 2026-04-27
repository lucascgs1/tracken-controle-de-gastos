const fs = require('fs');
const path = require('path');

const examplePath = path.resolve(__dirname, '../.env.example');
const envPath = path.resolve(__dirname, '../.env');

if (!fs.existsSync(envPath)) {
	console.error('\x1b[31m%s\x1b[0m', '❌ Erro: Arquivo .env não encontrado!');
	console.log('Crie um arquivo .env baseado no .env.example para continuar.\n');
	process.exit(1);
}

const exampleEnv = fs.readFileSync(examplePath, 'utf8');
const currentEnv = fs.readFileSync(envPath, 'utf8');

const getEntries = (content) =>
	content
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#') && line.includes('='))
		.map((line) => {
			const [key, ...valueParts] = line.split('=');
			return { key: key.trim(), value: valueParts.join('=').trim() };
		});

const requiredKeys = getEntries(exampleEnv).map((e) => e.key);
const presentEntries = getEntries(currentEnv);
const presentKeys = presentEntries.map((e) => e.key);

const missingKeys = requiredKeys.filter((key) => !presentKeys.includes(key));
const emptyKeys = presentEntries
	.filter((e) => requiredKeys.includes(e.key) && !e.value)
	.map((e) => e.key);

if (missingKeys.length > 0 || emptyKeys.length > 0) {
	if (missingKeys.length > 0) {
		console.error('\x1b[31m%s\x1b[0m', '❌ Erro: Variáveis de ambiente faltando no seu .env:');
		missingKeys.forEach((key) => console.log(`   - ${key}`));
	}
	if (emptyKeys.length > 0) {
		console.error('\x1b[31m%s\x1b[0m', '❌ Erro: Variáveis de ambiente vazias no seu .env:');
		emptyKeys.forEach((key) => console.log(`   - ${key}`));
	}
	console.log('\nAtualize seu .env para evitar erros em tempo de execução.\n');
	process.exit(1);
}

console.log('\x1b[32m%s\x1b[0m', '✅ Variáveis de ambiente validadas com sucesso!');
