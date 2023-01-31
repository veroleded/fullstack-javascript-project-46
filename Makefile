install:
		npm ci
gendiff:	
		bin/gendiff.js
test:
		npm test
lint:
		npx eslint .
publish:
		npm publish --dry-run
test-coverage:
		npm test -- --coverage 