#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const readline = require('readline')

const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	cyan: '\x1b[36m',
}

const log = {
	info: msg => console.log(`${colors.cyan}${msg}${colors.reset}`),
	success: msg => console.log(`${colors.green}${msg}${colors.reset}`),
	warning: msg => console.log(`${colors.yellow}${msg}${colors.reset}`),
	error: msg => console.log(`${colors.red}${msg}${colors.reset}`),
	title: msg =>
		console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
}

const rootDir = path.resolve(__dirname, '..')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

function askQuestion(question) {
	return new Promise(resolve => {
		rl.question(question, answer => {
			resolve(answer)
		})
	})
}

function runBuild() {
	log.title('Building the package...')
	try {
		execSync('node scripts/build.js', { cwd: rootDir, stdio: 'inherit' })
		log.success('Package built successfully')
		return true
	} catch (error) {
		log.error('Failed to build the package')
		return false
	}
}

function runTests() {
	log.title('Running tests...')
	try {
		execSync('npm test', { cwd: rootDir, stdio: 'inherit' })
		log.success('Tests passed successfully')
		return true
	} catch (error) {
		log.error('Tests failed')
		return false
	}
}

async function publishToNpm() {
	log.title('Publishing to npm...')

	try {
		execSync('npm whoami', { stdio: 'pipe' })
	} catch (error) {
		log.error('You are not logged in to npm. Please run `npm login` first.')
		return false
	}

	const answer = await askQuestion(
		`${colors.yellow}Are you sure you want to publish this package to npm? (y/n) ${colors.reset}`,
	)

	if (answer.toLowerCase() !== 'y') {
		log.info('Publication cancelled')
		return false
	}

	try {
		process.chdir(path.join(rootDir, 'dist'))

		execSync('npm publish', { stdio: 'inherit' })

		process.chdir(rootDir)

		log.success('Package published successfully')
		return true
	} catch (error) {
		log.error(`Failed to publish package: ${error.message}`)
		return false
	}
}

async function publish() {
	log.title('Starting publish process...')

	if (!runBuild()) {
		rl.close()
		return
	}

	if (!runTests()) {
		const answer = await askQuestion(
			`${colors.yellow}Tests failed. Do you still want to continue with publishing? (y/n) ${colors.reset}`,
		)
		if (answer.toLowerCase() !== 'y') {
			log.info('Publication cancelled')
			rl.close()
			return
		}
	}

	await publishToNpm()

	log.title('Publish process completed')
	rl.close()
}

publish()
