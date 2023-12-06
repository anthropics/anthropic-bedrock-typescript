# Anthropic Bedrock TypeScript API Library

[![NPM version](https://img.shields.io/npm/v/@anthropic-ai/bedrock-sdk.svg)](https://npmjs.org/package/@anthropic-ai/bedrock-sdk)

This library provides convenient access to the [Anthropic Bedrock](https://docs.anthropic.com/claude/docs/claude-on-amazon-bedrock) REST API from server-side TypeScript or JavaScript.

For the non-Bedrock Anthropic API at api.anthropic.com, see [`@anthropic-ai/sdk`](https://github.com/anthropics/anthropic-sdk-typescript).

The API documentation can be found [here](https://docs.anthropic.com/claude/reference/).

## Installation

```sh
npm install --save @anthropic-ai/bedrock-sdk
# or
yarn add @anthropic-ai/bedrock-sdk
```

## Usage

The full API of this library can be found in [api.md](https://www.github.com/anthropics/anthropic-bedrock-typescript/blob/main/api.md).

```js
import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';

const client = new AnthropicBedrock({
  // Authenticate by either providing the keys below or use the default AWS credential providers, such as
  // using ~/.aws/credentials or the "AWS_SECRET_ACCESS_KEY" and "AWS_ACCESS_KEY_ID" environment variables.
  awsAccessKey: '<access key>',
  awsSecretKey: '<secret key>',

  // Temporary credentials can be used with awsSessionToken.
  // Read more at https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html.
  awsSessionToken: '<session_token>',

  // awsRegion changes the aws region to which the request is made. By default, we read AWS_REGION,
  // and if that's not present, we default to us-east-1. Note that we do not read ~/.aws/config for the region.
  awsRegion: 'us-east-2',
});

async function main() {
  const completion = await client.completions.create({
    model: 'anthropic.claude-v2',
    max_tokens_to_sample: 256,
    prompt: `${AnthropicBedrock.HUMAN_PROMPT} how does a court case get to the Supreme Court? ${AnthropicBedrock.AI_PROMPT}`,
  });
}
main().catch(console.error);
```

## Streaming Responses

We provide support for streaming responses using Server Sent Events (SSE).

```ts
import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';

const client = new AnthropicBedrock();

const stream = await client.completions.create({
  prompt: `${AnthropicBedrock.HUMAN_PROMPT} Your prompt here${AnthropicBedrock.AI_PROMPT}`,
  model: 'anthropic.claude-v2',
  stream: true,
  max_tokens_to_sample: 300,
});
for await (const completion of stream) {
  console.log(completion.completion);
}
```

If you need to cancel a stream, you can `break` from the loop
or call `stream.controller.abort()`.

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

```ts
import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';

const client = new AnthropicBedrock();

async function main() {
  const params: AnthropicBedrock.CompletionCreateParams = {
    model: 'anthropic.claude-v2',
    prompt: `${AnthropicBedrock.HUMAN_PROMPT} how does a court case get to the Supreme Court? ${AnthropicBedrock.AI_PROMPT}`,
    max_tokens_to_sample: 256,
  };
  const completion: AnthropicBedrock.Completion = await client.completions.create(params);
}
main().catch(console.error);
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

> This library uses [@smithy/signature-v4](https://www.npmjs.com/package/@smithy/signature-v4) internally for authentication; you can read more about default providers [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_credential_providers.html#fromnodeproviderchain).

## Counting Tokens

We provide a [separate package](https://github.com/anthropics/anthropic-tokenizer-typescript) for counting how many tokens a given piece of text contains.

See the [repository documentation](https://github.com/anthropics/anthropic-tokenizer-typescript) for more details.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

```ts
async function main() {
  const completion = await anthropicBedrock.completions
    .create({
      model: 'anthropic.claude-v2',
      prompt: `${AnthropicBedrock.HUMAN_PROMPT} your prompt here ${AnthropicBedrock.AI_PROMPT}`,
      max_tokens_to_sample: 256,
    })
    .catch((err) => {
      if (err instanceof AnthropicBedrock.APIError) {
        console.log(err.status); // 400
        console.log(err.name); // BadRequestError
        console.log(err.headers); // {server: 'nginx', ...}
      }
    });
}
main().catch(console.error);
```

Error codes are as followed:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const client = new AnthropicBedrock({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.completions.create(
  {
    prompt: `${AnthropicBedrock.HUMAN_PROMPT} Can you help me effectively ask for a raise at work?${AnthropicBedrock.AI_PROMPT}`,
    max_tokens_to_sample: 300,
    model: 'anthropic.claude-v2',
  },
  {
    maxRetries: 5,
  },
);
```

### Timeouts

Requests time out after 10 minutes by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const client = new AnthropicBedrock({
  timeout: 20 * 1000, // 20 seconds (default is 10 minutes)
});

// Override per-request:
await client.completions.create(
  {
    prompt: `${AnthropicBedrock.HUMAN_PROMPT} Where can I get a good coffee in my neighbourhood?${AnthropicBedrock.AI_PROMPT}`,
    max_tokens_to_sample: 300,
    model: 'anthropic.claude-v2',
  },
  {
    timeout: 5 * 1000,
  },
);
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

```ts
const response = await client.completions
  .create({
    model: 'anthropic.claude-v2',
    prompt: `${AnthropicBedrock.HUMAN_PROMPT} your prompt here ${AnthropicBedrock.AI_PROMPT}`,
    max_tokens_to_sample: 256,
  })
  .asResponse();

console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: completions, response: raw } = await client.completions
  .create({
    model: 'anthropic.claude-v2',
    prompt: `${AnthropicBedrock.HUMAN_PROMPT} your prompt here ${AnthropicBedrock.AI_PROMPT}`,
    max_tokens_to_sample: 256,
  })
  .withResponse();

console.log(raw.headers.get('X-My-Header'));
console.log(completions.choices);
```

## Customizing the fetch client

By default, this library uses `node-fetch` in Node, and expects a global `fetch` function in other environments.

If you would prefer to use a global, web-standards-compliant `fetch` function even in a Node environment,
(for example, if you are running Node with `--experimental-fetch` or using NextJS which polyfills with `undici`),
add the following import before your first import `from "AnthropicBedrock"`:

<!-- prettier-ignore -->
```ts
// Tell TypeScript and the package to use the global web fetch instead of node-fetch.
// Note, despite the name, this does not add any polyfills, but expects them to be provided if needed.
import "@anthropic-ai/bedrock-sdk/shims/web";
import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";
```

To do the inverse, add `import "@anthropic-ai/bedrock-sdk/shims/node"` (which does import polyfills).
This can also be useful if you are getting the wrong TypeScript types for `Response` - more details [here](https://github.com/anthropics/anthropic-bedrock-typescript/tree/main/src/_shims#readme).

You may also provide a custom `fetch` function when instantiating the client,
which can be used to inspect or alter the `Request` or `Response` before/after each request:

```ts
import { fetch } from 'undici'; // as one example
import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';

const client = new AnthropicBedrock({
  fetch: (url: RequestInfo, init?: RequestInfo): Response => {
    console.log('About to make request', url, init);
    const response = await fetch(url, init);
    console.log('Got response', response);
    return response;
  },
});
```

Note that if given a `DEBUG=true` environment variable, this library will log all requests and responses automatically.
This is intended for debugging purposes only and may change in the future without notice.

## Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';
import HttpsProxyAgent from 'https-proxy-agent';

// Configure the default for all requests:
const client = new AnthropicBedrock({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
await client.completions.create(
  {
    prompt: `${AnthropicBedrock.HUMAN_PROMPT} How does a court case get to the Supreme Court?${AnthropicBedrock.AI_PROMPT}`,
    max_tokens_to_sample: 300,
    model: 'anthropic.claude-v2',
  },
  {
    baseURL: 'http://localhost:8080/test-api',
    httpAgent: new http.Agent({ keepAlive: false }),
  },
);
```

## Semantic Versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals)_.
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/anthropics/anthropic-bedrock-typescript/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher, using `import AnthropicBedrock from "npm:@anthropic-ai/bedrock-sdk"`.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.
