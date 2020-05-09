#!/bin/bash

list="[ "
for i in $(ls); do
    name=${i::(-4)}
    list="$list, \"$name\""
done   

echo $list
