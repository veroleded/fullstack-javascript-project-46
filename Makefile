install-deps:
		npm ci
gendiff:	
		bin/gendiff.js
test:
		npx jest .
lint:
		npx eslint .
publish:
		npm publish --dry-run
test-coverage:
		npx jest --coverage .