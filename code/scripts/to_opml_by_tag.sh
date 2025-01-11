#!/bin/bash
# This is a script to convert JSON into OPML
# It uses jinja2-cli
# Check https://thejeshgn.com/2021/12/07/jinja2-command-line-application/
# Take the first positional argument or use "Weekly-Notes" as default
tag=${1:-"Weekly-Notes"}

jinja2 --format=json -D tag=$tag -o ../../data/blogring_by_$tag.opml opml_by_tag.jinja2 ../../data/blogring.js 