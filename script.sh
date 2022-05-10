#!/usr/bin/env bash

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")


# Update clava-update-core
mkdir -p $SCRIPTPATH/Clava
cd $SCRIPTPATH/Clava
wget -N specs.fe.up.pt/tools/clava/clava-update-core
chmod +x clava-update-core

# Run clava-update-core
./clava-update-core $@
