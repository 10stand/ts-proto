#!/usr/bin/env bash

./pbjs.sh
./integration/pbjs.sh
(cd ./integration || exit; ./codegen.sh)

yarn test