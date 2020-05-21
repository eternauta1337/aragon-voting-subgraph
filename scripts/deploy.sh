#!/bin/bash

graph codegen

graph deploy ajsantander/aragon-voting \
  --ipfs https://api.thegraph.com/ipfs/ \
  --node https://api.thegraph.com/deploy/ \
  --access-token $GRAPHKEY
