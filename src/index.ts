// File generated from our OpenAPI spec by Stainless.

import * as Core from './core';
import * as Errors from './error';
import { type Agent } from './_shims/index';
import * as Uploads from './uploads';
import { type RequestInit } from './_shims/index';
import { getAuthHeaders } from './auth';
import * as API from '@anthropic-ai/bedrock-sdk/resources/index';

export interface ClientOptions {
  awsSecretKey?: string | null;

  awsAccessKey?: string | null;

  /**
   * Defaults to process.env['AWS_REGION'].
   */
  awsRegion?: string;

  awsSessionToken?: string | null;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['ANTHROPIC_BEDROCK_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/** API Client for interfacing with the Anthropic Bedrock API. */
export class AnthropicBedrock extends Core.APIClient {
  awsSecretKey: string | null;
  awsAccessKey: string | null;
  awsRegion: string;
  awsSessionToken: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Anthropic Bedrock API.
   *
   * @param {string | null} [opts.awsSecretKey]
   * @param {string | null} [opts.awsAccessKey]
   * @param {string} [opts.awsRegion=process.env['AWS_REGION'] ?? us-east-1]
   * @param {string | null} [opts.awsSessionToken]
   * @param {string} [opts.baseURL=process.env['ANTHROPIC_BEDROCK_BASE_URL'] ?? https://bedrock-runtime.SDK_ClientAttribute__aws_region.amazonaws.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('ANTHROPIC_BEDROCK_BASE_URL'),
    awsSecretKey = null,
    awsAccessKey = null,
    awsRegion = Core.readEnv('AWS_REGION') ?? 'us-east-1',
    awsSessionToken = null,
    ...opts
  }: ClientOptions = {}) {
    const options: ClientOptions = {
      awsSecretKey,
      awsAccessKey,
      awsRegion,
      awsSessionToken,
      ...opts,
      baseURL: baseURL || `https://bedrock-runtime.${awsRegion}.amazonaws.com`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 600000 /* 10 minutes */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });
    this._options = options;

    this.awsSecretKey = awsSecretKey;
    this.awsAccessKey = awsAccessKey;
    this.awsRegion = awsRegion;
    this.awsSessionToken = awsSessionToken;
  }

  completions: API.Completions = new API.Completions(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: Core.FinalRequestOptions },
  ): Promise<void> {
    const regionName = this.awsRegion;
    if (!regionName) {
      throw new Error(
        'Expected `awsRegion` option to be passed to the client or the `AWS_REGION` environment variable to be present',
      );
    }

    const headers = await getAuthHeaders(request, {
      url,
      regionName,
      awsAccessKey: this.awsAccessKey,
      awsSecretKey: this.awsSecretKey,
      awsSessionToken: this.awsSessionToken,
    });
    request.headers = { ...request.headers, ...headers };
  }

  static AnthropicBedrock = this;
  static HUMAN_PROMPT = '\n\nHuman:';
  static AI_PROMPT = '\n\nAssistant:';

  static AnthropicBedrockError = Errors.AnthropicBedrockError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
}

export const { HUMAN_PROMPT, AI_PROMPT } = AnthropicBedrock;

export const {
  AnthropicBedrockError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace AnthropicBedrock {
  // Helper functions
  export import toFile = Uploads.toFile;
  export import fileFromPath = Uploads.fileFromPath;

  export import RequestOptions = Core.RequestOptions;

  export import Completions = API.Completions;
  export import Completion = API.Completion;
  export import CompletionCreateParams = API.CompletionCreateParams;
  export import CompletionCreateParamsNonStreaming = API.CompletionCreateParamsNonStreaming;
  export import CompletionCreateParamsStreaming = API.CompletionCreateParamsStreaming;
}

export default AnthropicBedrock;
