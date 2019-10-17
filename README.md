# REVALID. Custom OpenAPI validator

## Approach
Unline other OpenAPI validators Revalid defines the possible type tree of a valid OpenAPI document and then traverses input validating it. This approach is very similar to how compilers work and gives major performance benefits over other approaches. Also, it allows to easily add custom or quite complex rules.

## Features

![Revalid output screenshot](/media/screenshot-output.png)

As for now, Revalid supports such features:

- [x] Multifile validation. No need to bundle your file before using validator.
- [x] Configurable message levels for each rule. You can tailor your experience with Revalid as you wish.
- [x] Lightning fast validation. Check 1 Mb file less than in one second.
- [x] Human readable error messages. Now with stacktrace and codeframes.
- [x] Intuitive suggestions for misspelled type names or references.
- [x] Easy to implement custom rules. Need something? Ask us or do it yourself.

All of them are also provided inside our [VS Code extension](https://redoc.ly).

### Configuration

You can enable/disable separate rules as well as set their priority level using the `revalid.config.json` file which should be in the directory from which you run Revalid.

Example of the configuration file is quite self-explanatory:

```json
{
    "enableCodeframe": true,
    "rules": {
    	"no-extra-fields": "off",
      "license": {
        "url": "on"
      },
      "license-required": {
        "level": "warning"
      },
      "unique-parameter-names": {
        "level": "error",
      },
      "no-unused-schemas": "off"
    }
}
```

More detailed guide about configuring the validator can be found [here](RULES.md).

## Contributing

### Custom validation rules

To create a custom validation rule you should only define a class which extends `AbstractVisitor`. Inside this class, you can define methods for each type of the OpenAPI Nodes, which returns two methods: `onEnter` and `onExit`. Also, you can use `any()` descriptor to call the rule for all the nodes in your document. These methods will receive four arguments:
- node
- type object
- context
- unresolved node (i.e. before $ref in the root of the node was jumped to)

The rule **must not** mutate any of these object as they are not immutable due to performance reasons.

So, the simplest rule example is following:

```js
import createError from '../error'; // later it will be a separete package: @revalid/rules

class ExampleRule extends AbstractVisitor {
  static get ruleName() {
    return 'exampleRule';
  }

  any() {
    return {
      onEnter: (node, definition, ctx, unresolvedNode) => {
        if (node.name && node.name === 'badName') return createError('"badName" is invalid value for "name" field', node, ctx, { fromRule: this.rule, target: 'value', severity: this.config.level});
      }
    }
  }
}

export default ExampleRule;
```

Then, put the rule into your local copy of `extendedRules` directory or provide path to the directory with your rule set via `--custom-ruleset <path>` command line argument.