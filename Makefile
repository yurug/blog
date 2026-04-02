.PHONY: serve build clean lint translate

serve:
	hugo server -D

build:
	hugo --gc --minify

lint:
	./scripts/lint.sh content

translate:
	./scripts/translate.sh

clean:
	rm -rf public/ resources/
