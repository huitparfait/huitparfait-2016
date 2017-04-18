#!/bin/bash

# in order to login to the docker registry
#travis env set DOCKER_EMAIL me@example.com
#travis env set DOCKER_USERNAME myusername
#travis env set DOCKER_PASSWORD secretsecret

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
  docker build --rm -t huitparfait/foo -f DockerfileFoo .
  docker push huitparfait/foo
fi
