#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = {
  info: msg => console.log(`${colors.cyan}${msg}${colors.reset}`),
  success: msg => console.log(`${colors.green}${msg}${colors.reset}`),
  warning: msg => console.log(`${colors.yellow}${msg}${colors.reset}`),
  error: msg => console.log(`${colors.red}${msg}${colors.reset}`),
  title: msg => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Clean dist directory
function cleanDist() {
  log.info('Cleaning dist directory...');
  try {
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
    }
    fs.mkdirSync(distDir, { recursive: true });
    log.success('Dist directory cleaned');
  } catch (error) {
    log.error(`Failed to clean dist directory: ${error.message}`);
    process.exit(1);
  }
}

// Run rollup to build the package
function runRollup() {
  log.info('Building package with rollup...');
  try {
    execSync('npx rollup -c', { cwd: rootDir, stdio: 'inherit' });
    log.success('Rollup build completed');
  } catch (error) {
    log.error(`Rollup build failed: ${error.message}`);
    process.exit(1);
  }
}

// Copy and prepare package.json for publishing
function preparePackageJson() {
  log.info('Preparing package.json for publishing...');
  try {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Create a simplified version for publishing
    const publishPackageJson = {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      type: packageJson.type,
      main: 'index.js', // Relative to dist directory
      module: 'index.esm.js', // Relative to dist directory
      types: 'index.d.ts', // Relative to dist directory
      author: packageJson.author,
      license: packageJson.license,
      keywords: packageJson.keywords,
      peerDependencies: packageJson.peerDependencies,
      repository: packageJson.repository,
      bugs: packageJson.bugs,
      homepage: packageJson.homepage,
    };

    fs.writeFileSync(
      path.join(distDir, 'package.json'),
      JSON.stringify(publishPackageJson, null, 2)
    );

    log.success('Package.json prepared for publishing');
  } catch (error) {
    log.error(`Failed to prepare package.json: ${error.message}`);
    process.exit(1);
  }
}

// Copy README and LICENSE to dist
function copyFiles() {
  log.info('Copying additional files to dist...');
  try {
    fs.copyFileSync(path.join(rootDir, 'README.md'), path.join(distDir, 'README.md'));

    fs.copyFileSync(path.join(rootDir, 'LICENSE'), path.join(distDir, 'LICENSE'));

    log.success('Additional files copied');
  } catch (error) {
    log.error(`Failed to copy files: ${error.message}`);
    process.exit(1);
  }
}

// Main build function
function build() {
  log.title('Starting build process');

  cleanDist();
  runRollup();
  preparePackageJson();
  copyFiles();

  log.title('Build completed successfully');
}

// Run the build
build();
