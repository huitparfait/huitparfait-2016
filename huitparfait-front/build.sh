#!/bin/bash

docker build --rm -f build.Dockerfile -t huitparfait/front-build . && \

docker run -it -v $(pwd)/dist:/app/dist  huitparfait/front-build && \

docker build --rm -f Dockerfile -t huitparfait/huitparfait-front . && \

docker push huitparfait/huitparfait-front
