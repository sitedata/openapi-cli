import { LintConfig, RuleConfig } from '../../../../config/config';
import { parseYamlToDocument } from '../../../../__tests__/utils';
import { validateDocument } from '../../../../validate';

export async function validateDoc(
  source: string,
  rules: Record<string, RuleConfig> = { schema: 'error' },
) {
  const document = parseYamlToDocument(source, 'foobar.yaml');

  const results = await validateDocument({
    document,
    config: new LintConfig({
      extends: [],
      rules,
    }),
  });

  return results.map((res) => {
    return {
      message: res.message,
      location: res.location[0].pointer || '',
    };
  });
}