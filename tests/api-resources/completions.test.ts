// File generated from our OpenAPI spec by Stainless.

import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';
import { Response } from 'node-fetch';

const anthropicBedrock = new AnthropicBedrock({
  awsSecretKey: '<secret key>',
  awsAccessKey: '<access key>',
  awsRegion: 'us-east-2',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = anthropicBedrock.completions.create({
      model: 'anthropic.claude-v2:1',
      max_tokens_to_sample: 256,
      prompt: '\n\nHuman: Hello, world!\n\nAssistant:',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await anthropicBedrock.completions.create({
      model: 'anthropic.claude-v2:1',
      max_tokens_to_sample: 256,
      prompt: '\n\nHuman: Hello, world!\n\nAssistant:',
      stop_sequences: ['string', 'string', 'string'],
      stream: false,
      temperature: 1,
      top_k: 5,
      top_p: 0.7,
    });
  });
});
