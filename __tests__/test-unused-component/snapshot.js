// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Run e2e tests tests Test /Users/knidarkness/work/redoc.ly/openapi-cli/__tests__/test-unused-component 1`] = `
"[1] openapi.yaml:91:5 at #/components/parameters/anotherParam

Component: \\"anotherParam\\" is never used.

89 | components:
90 |   parameters:
91 |     anotherParam:
   |     ^^^^^^^^^^^^
92 |       name: anotherParam
93 |       schema:

warning was generated by no-unused-schemas rule.


[2] openapi.yaml:97:5 at #/components/schemas/Someaa

Component: \\"Someaa\\" is never used.

95 |     in: query
96 | schemas:
97 |   Someaa:
   |   ^^^^^^
98 |     type: integer
99 |     enum:

warning was generated by no-unused-schemas rule.


Woohoo! Your OpenAPI definition is valid 🎉
You have 2 warnings 

"
`;
