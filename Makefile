.PHONY: serve build clean lint

serve:
	hugo server -D

build:
	hugo --gc --minify

lint:
	./scripts/lint.sh content

clean:
	rm -rf public/ resources/
