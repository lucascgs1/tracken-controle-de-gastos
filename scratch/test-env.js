// Simulate the validate-env.js logic
const exampleEnv = `
FIREBASE_API_KEY=
FIREBASE_PROJECT_ID=
`;

const currentEnv = `
FIREBASE_API_KEY=AIza...
FIREBASE_PROJECT_ID=
`;

const getEntries = (content) =>
	content
		.split('\n')
		.filter((line) => line && !line.startsWith('#'))
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

console.log('Missing:', missingKeys);
console.log('Empty:', emptyKeys);

if (missingKeys.length > 0 || emptyKeys.length > 0) {
	console.log('Validation FAILED (Expected)');
} else {
	console.log('Validation PASSED');
}
