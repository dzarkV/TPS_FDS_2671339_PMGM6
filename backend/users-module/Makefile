runapp:
	python3 app/main.py

buildenv:
	python -m venv venv

activatevenv:
	source venv/bin/activate

installlibs:
	pip install -r requirements.txt

buildapp:
	buildenv
	activateenv
	installlibs

testapp:
	cd app && python -m pytest -vv
