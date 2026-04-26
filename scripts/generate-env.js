const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carrega .env
dotenv.config();

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY || '',
	authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
	projectId: process.env.FIREBASE_PROJECT_ID || '',
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
	appId: process.env.FIREBASE_APP_ID || '',
	measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
};

const content = `
export const environment = {
  production: false,
  firebase: ${JSON.stringify(firebaseConfig, null, 2)}
};
`;

const paths = [
	'shell/src/environments/environment.ts',
	'dashboard/src/environments/environment.ts',
	'settings/src/environments/environment.ts',
];

paths.forEach((p) => {
	const fullPath = path.resolve(__dirname, '..', p);
	const dir = path.dirname(fullPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	fs.writeFileSync(fullPath, content);
	console.log(`✅ Generated environment file: ${p}`);
});
