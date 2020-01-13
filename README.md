# Prompt-Once Insomnia Template Tag Plugin

This plugin is similar to the built-in Prompt tag, but will store the value for the key provided and reuse on subsequent requests. This differs from environment variables because you can quickly change the value and re-use previously entered values. It will only prompt for a value if an override value or existing stored value does not exist.

## Popular Uses

While this can be used wherever Template Tags are valid, the main use case is for url parameter variables.