#!/bin/bash

DATA=$1

mustache -p manifest/templates/daoFactory.template.yaml manifest/data/$DATA.json manifest/templates/subgraph.template.yaml > subgraph.yaml