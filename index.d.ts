export declare class YoutubeTranscriptError extends Error {
  constructor(message: string);
}
export declare class YoutubeTranscriptTooManyRequestError extends YoutubeTranscriptError {
  constructor();
}
export declare class YoutubeTranscriptVideoUnavailableError extends YoutubeTranscriptError {
  constructor(videoId: string);
}
export declare class YoutubeTranscriptDisabledError extends YoutubeTranscriptError {
  constructor(videoId: string);
}
export declare class YoutubeTranscriptNotAvailableError extends YoutubeTranscriptError {
  constructor(videoId: string);
}
export declare class YoutubeTranscriptNotAvailableLanguageError extends YoutubeTranscriptError {
  constructor(lang: string, availableLangs: string[], videoId: string);
}
export interface TranscriptConfig {
  lang?: string;
  fetch?: typeof globalThis.fetch;
  /** Apify API token; defaults to the APIFY_TOKEN environment variable. */
  apifyToken?: string;
}
export interface TranscriptResponse {
  text: string;
  /** Milliseconds. */
  duration: number;
  /** Milliseconds from the start of the video. */
  offset: number;
  lang?: string;
}
export declare class YoutubeTranscript {
  static fetchTranscript(videoId: string, config?: TranscriptConfig): Promise<TranscriptResponse[]>;
  /** Many videos in one request; each value is the transcript or the error for that video. */
  static fetchTranscripts(videoIds: string[], config?: TranscriptConfig): Promise<Record<string, TranscriptResponse[] | YoutubeTranscriptError>>;
}
export declare function fetchTranscript(videoId: string, config?: TranscriptConfig): Promise<TranscriptResponse[]>;
