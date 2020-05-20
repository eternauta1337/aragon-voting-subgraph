#!/bin/bash

NETWORK=$1

mustache -p manifest/templates/daoFactory.template.yaml manifest/data/$NETWORK.json manifest/templates/subgraph.template.yaml > subgraph.yaml