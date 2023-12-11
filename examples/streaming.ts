#!/usr/bin/env -S npm run tsn -T

import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';

// Note: this assumes you have configured AWS credentials in a way
// that the AWS Node SDK will recognise, typicaly a shared `~/.aws/credentials`
// file or `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` environment variables.
//
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_credential_provider_node.html
const client = new AnthropicBedrock();

async function main() {
  const question = 'Hey Claude! How can I recursively list all files in a directory in Rust?';

  const stream = await client.completions.create({
    prompt: `${AnthropicBedrock.HUMAN_PROMPT}${question}${AnthropicBedrock.AI_PROMPT}:`,
    model: 'anthropic.claude-v2:1',
    stream: true,
    max_tokens_to_sample: 500,
  });

  for await (const completion of stream) {
    process.stdout.write(completion.completion);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
