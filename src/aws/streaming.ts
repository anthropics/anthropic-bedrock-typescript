import { EventStreamMarshaller } from '@smithy/eventstream-serde-node';
import { fromBase64, toBase64 } from '@smithy/util-base64';
import { streamCollector } from '@smithy/fetch-http-handler';
import { EventStreamSerdeContext, SerdeContext } from '@smithy/types';

export const toUtf8 = (input: Uint8Array): string => new TextDecoder('utf-8').decode(input);
export const fromUtf8 = (input: string): Uint8Array => new TextEncoder().encode(input);

// `de_ResponseStream` parses a Bedrock response stream and emits events as they are found.
// It requires a "context" argument which has many fields, but for what we're using it for
// it only needs this.
export const getMinimalSerdeContext = (): SerdeContext & EventStreamSerdeContext => {
  const marshaller = new EventStreamMarshaller({ utf8Encoder: toUtf8, utf8Decoder: fromUtf8 });
  return {
    base64Decoder: fromBase64,
    base64Encoder: toBase64,
    utf8Decoder: fromUtf8,
    utf8Encoder: toUtf8,
    eventStreamMarshaller: marshaller,
    streamCollector: streamCollector,
  } as unknown as SerdeContext & EventStreamSerdeContext;
};
