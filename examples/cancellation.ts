#!/usr/bin/env -S npm run tsn -T

import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';

// Note: this assumes you have configured AWS credentials in a way
// that the AWS Node SDK will recognise, typicaly a shared `~/.aws/credentials`
// file or `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` environment variables.
//
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_credential_provider_node.html
const client = new AnthropicBedrock();

/**
 * This script demonstrates two ways of cancelling a stream,
 * by racing to see whether some Rust code prints "unwrap"
 * before 1.5 seconds or not.
 *
 * The most common is simply to `break` from the loop,
 * but you can also call `stream.controller.abort()` from outside the loop
 * if you need to.
 */
async function main() {
  const question = 'Hey Claude! How can I recursively list all files in a directory in Rust?';

  const stream = await client.completions.create({
    prompt: `${AnthropicBedrock.HUMAN_PROMPT}${question}${AnthropicBedrock.AI_PROMPT}:`,
    model: 'anthropic.claude-v2:1',
    stream: true,
    max_tokens_to_sample: 500,
  });

  // If you need to, you can cancel a stream from outside the iterator
  // by calling "stream.controller.abort()"
  const timeout = setTimeout(() => {
    console.log('\nCancelling after 1.5 seconds.');
    stream.controller.abort();
  }, 1500);

  for await (const completion of stream) {
    process.stdout.write(completion.completion);

    // Most typically, you can cancel the stream by using "break"
    if (completion.completion.includes('unwrap')) {
      console.log('\nCancelling after seeing "unwrap".');
      clearTimeout(timeout);
      break;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
