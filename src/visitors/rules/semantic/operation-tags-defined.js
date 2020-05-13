/* eslint-disable no-underscore-dangle */
class OperationTags {
  static get rule() {
    return 'operation-tags-defined';
  }

  constructor() {
    this.globalTagNames = [];
  }

  _readGlobalTags(node) {
    this.globalTagNames = node.tags ? node.tags.map((tag) => tag.name) : [];
  }

  _processOperationTags(node, _, ctx) {
    if (!node.tags) return [];
    const errors = [];
    for (let i = 0; i < node.tags.length; i++) {
      const tag = node.tags[i];
      if (this.globalTagNames.indexOf(tag) === -1) {
        ctx.path.push('tags');
        ctx.path.push(i);
        errors.push(ctx.createError('Operation tags should be defined in the top level "tags" object.', 'value'));
        ctx.path.pop();
        ctx.path.pop();
      }
    }
    return errors;
  }

  OpenAPIOperation(node, _, ctx) {
    return this._processOperationTags(node, _, ctx);
  }

  OAS2Operation(node, _, ctx) {
    return this._processOperationTags(node, _, ctx);
  }

  OAS2Root(node) {
    return this._readGlobalTags(node);
  }

  OpenAPIRoot(node) {
    return this._readGlobalTags(node);
  }
}

module.exports = OperationTags;
