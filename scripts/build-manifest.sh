#!/bin/bash

NETWORK=$1

if [ -z "$DEV" ]
then
  FILE=$NETWORK'.json'
else
  FILE=$NETWORK'-dev.json'
fi

DATA=manifest/data/$FILE

echo 'Generating manifest from: '$DATA
cat $DATA

mustache -p manifest/templates/daoFactory.template.yaml $DATA manifest/templates/subgraph.template.yaml > subgraph.yaml
