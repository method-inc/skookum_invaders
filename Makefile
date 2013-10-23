setup:
	bower install
	npm install

github-pages:
	@git subtree push --prefix dist origin gh-pages