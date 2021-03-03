transifex_resource = frontend-template-application
transifex_langs = "ar,fr,es_419,zh_CN"

transifex_utils = ./node_modules/.bin/transifex-utils.js
i18n = ./src/i18n
transifex_input = $(i18n)/transifex_input.json
tx_url1 = https://www.transifex.com/api/2/project/edx-platform/resource/$(transifex_resource)/translation/en/strings/
tx_url2 = https://www.transifex.com/api/2/project/edx-platform/resource/$(transifex_resource)/source/

# This directory must match .babelrc .
transifex_temp = ./temp/babel-plugin-react-intl

precommit:
	npm run lint
	npm audit

requirements:
	npm install

# This target is used by Travis.
validate-no-uncommitted-package-lock-changes:
	# Checking for package-lock.json changes...
	git diff --exit-code package-lock.json
