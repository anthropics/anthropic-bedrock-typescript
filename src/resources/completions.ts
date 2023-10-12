// File generated from our OpenAPI spec by Stainless.

import * as Core from '@anthropic-ai/bedrock-sdk/core';
import { APIPromise } from '@anthropic-ai/bedrock-sdk/core';
import { APIResource } from '@anthropic-ai/bedrock-sdk/resource';
import * as CompletionsAPI from '@anthropic-ai/bedrock-sdk/resources/completions';
import { Stream } from '@anthropic-ai/bedrock-sdk/streaming';

export class Completions extends APIResource {
  /**
   * Create a completion
   */
  create(params: CompletionCreateParamsNonStreaming, options?: Core.RequestOptions): APIPromise<Completion>;
  create(
    params: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<Completion>>;
  create(
    params: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<Completion> | Completion>;
  create(
    params: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<Completion> | APIPromise<Stream<Completion>> {
    const { model, stream, ...body } = params;
    return this.post(stream ? `/model/${model}/invoke-with-response-stream` : `/model/${model}/invoke`, {
      body: { anthropic_version: 'bedrock-2023-05-31', ...body },
      ...options,
      stream: stream ?? false,
    }) as APIPromise<Completion> | APIPromise<Stream<Completion>>;
  }
}

export interface Completion {
  /**
   * The resulting completion up to and excluding the stop sequences.
   */
  completion: string;

  /**
   * The reason that we stopped sampling.
   *
   * This may be one the following values:
   *
   * - `"stop_sequence"`: we reached a stop sequence — either provided by you via the
   *   `stop_sequences` parameter, or a stop sequence built into the model
   * - `"max_tokens"`: we exceeded `max_tokens_to_sample` or the model's maximum
   */
  stop_reason: string;
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  /**
   * Path param: Bedrock model ID
   */
  model: (string & {}) | 'anthropic.claude-v2' | 'anthropic.claude-v1' | 'anthropic.claude-instant-v1';

  /**
   * Body param: The maximum number of tokens to generate before stopping.
   *
   * Note that our models may stop _before_ reaching this maximum. This parameter
   * only specifies the absolute maximum number of tokens to generate.
   */
  max_tokens_to_sample: number;

  /**
   * Body param: The prompt that you want Claude to complete.
   *
   * For proper response generation you will need to format your prompt as follows:
   *
   * ```javascript
   * const userQuestion = r"Why is the sky blue?";
   * const prompt = `\n\nHuman: ${userQuestion}\n\nAssistant:`;
   * ```
   *
   * See our
   * [comments on prompts](https://docs.anthropic.com/claude/docs/introduction-to-prompt-design)
   * for more context.
   */
  prompt: string;

  /**
   * Body param: Sequences that will cause the model to stop generating completion
   * text.
   *
   * Our models stop on `"\n\nHuman:"`, and may include additional built-in stop
   * sequences in the future. By providing the stop_sequences parameter, you may
   * include additional strings that will cause the model to stop generating.
   */
  stop_sequences?: Array<string>;

  /**
   * Body param: Whether to incrementally stream the response or not.
   */
  stream?: boolean;

  /**
   * Body param: Amount of randomness injected into the response.
   *
   * Defaults to 1. Ranges from 0 to 1. Use temp closer to 0 for analytical /
   * multiple choice, and closer to 1 for creative and generative tasks.
   */
  temperature?: number;

  /**
   * Body param: Only sample from the top K options for each subsequent token.
   *
   * Used to remove "long tail" low probability responses.
   * [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
   */
  top_k?: number;

  /**
   * Body param: Use nucleus sampling.
   *
   * In nucleus sampling, we compute the cumulative distribution over all the options
   * for each subsequent token in decreasing probability order and cut it off once it
   * reaches a particular probability specified by `top_p`. You should either alter
   * `temperature` or `top_p`, but not both.
   */
  top_p?: number;
}

export namespace CompletionCreateParams {
  export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  /**
   * Body param: Whether to incrementally stream the response or not.
   */
  stream?: false;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  /**
   * Body param: Whether to incrementally stream the response or not.
   */
  stream: true;
}

export namespace Completions {
  export import Completion = CompletionsAPI.Completion;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
  export import CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export import CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}
