// Script to generate env config from .env file
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envPath = path.resolve(__dirname, '../.env');
const outputPath = path.resolve(__dirname, '../src/config/env.generated.ts');

// Read .env file
const envVars = {
  GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID || '',
  GOOGLE_ANDROID_CLIENT_ID: process.env.GOOGLE_ANDROID_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
  API_BASE_URL: process.env.API_BASE_URL || 'http://10.0.2.2:4000',
};

// Generate TypeScript file
const content = `// AUTO-GENERATED FILE - DO NOT EDIT
// This file is generated from .env by scripts/generate-env-config.js
// Run: npm run generate-env-config

export const ENV = {
  // Google OAuth
  GOOGLE_WEB_CLIENT_ID: '${envVars.GOOGLE_WEB_CLIENT_ID}',
  GOOGLE_ANDROID_CLIENT_ID: '${envVars.GOOGLE_ANDROID_CLIENT_ID}',
  GOOGLE_CLIENT_SECRET: '${envVars.GOOGLE_CLIENT_SECRET}',
  
  // Google Maps
  GOOGLE_MAPS_API_KEY: '${envVars.GOOGLE_MAPS_API_KEY}',
  
  // API Base URL
  API_BASE_URL: '${envVars.API_BASE_URL}',
};

// Validate required environment variables in development
if (typeof __DEV__ !== 'undefined' && __DEV__) {
  const required = ['GOOGLE_WEB_CLIENT_ID', 'GOOGLE_MAPS_API_KEY'];
  const missing = required.filter((key) => !ENV[key as keyof typeof ENV]);
  
  if (missing.length > 0) {
    console.warn(
      '⚠️ Missing environment variables:',
      missing.join(', '),
      '\\nPlease check your .env file and run: npm run generate-env-config'
    );
  }
}
`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log('✅ Generated env config:', outputPath);
console.log('✅ GOOGLE_WEB_CLIENT_ID:', envVars.GOOGLE_WEB_CLIENT_ID ? 'SET' : 'MISSING');

