# This is a script to convert JSON into OPML
# It uses jinja2-cli
# Check https://thejeshgn.com/2021/12/07/jinja2-command-line-application/
jinja2 --format=json -o ../../data/blogring.opml opml.jinja2 ../../data/blogring.js