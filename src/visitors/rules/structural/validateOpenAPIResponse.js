class ValidateOpenAPIResponse {
  static get rule() {
    return 'oas3-schema/response';
  }

  get validators() {
    return {
      description(node, ctx) {
        if (node && !node.description && node.description !== '') {
          return ctx.report({
            message: ctx.messageHelpers.missingRequiredField('description'),
            reportOnKey: true,
          });
        }
        if (typeof node.description !== 'string') {
          return ctx.report({
            message: ctx.messageHelpers.fieldTypeMismatchMessageHelper('string'),
          });
        }
        return null;
      },
    };
  }

  OpenAPIResponse(node, definition, ctx) {
    return ctx.validateFields(
      this.config, this.rule, this.validators,
    );
  }
}

module.exports = ValidateOpenAPIResponse;
