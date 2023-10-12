// File generated from our OpenAPI spec by Stainless.

import type { AnthropicBedrock } from './index';

export class APIResource {
  protected client: AnthropicBedrock;
  constructor(client: AnthropicBedrock) {
    this.client = client;

    this.get = client.get.bind(client);
    this.post = client.post.bind(client);
    this.patch = client.patch.bind(client);
    this.put = client.put.bind(client);
    this.delete = client.delete.bind(client);
    this.getAPIList = client.getAPIList.bind(client);
  }

  protected get: AnthropicBedrock['get'];
  protected post: AnthropicBedrock['post'];
  protected patch: AnthropicBedrock['patch'];
  protected put: AnthropicBedrock['put'];
  protected delete: AnthropicBedrock['delete'];
  protected getAPIList: AnthropicBedrock['getAPIList'];
}
