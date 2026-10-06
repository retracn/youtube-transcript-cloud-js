# youtube-transcript-cloud: youtube-transcript that works in production

The [youtube-transcript](https://github.com/Kakulukian/youtube-transcript) npm package fetches captions straight from YouTube, from wherever your code runs. That works on your laptop. But YouTube distrusts cloud IPs (Vercel, AWS Lambda, Render, Railway, Fly, Google Cloud), so in production it often throws `YoutubeTranscriptDisabledError` for videos that do have captions, or returns nothing. See its issues ["Doesn't work in production"](https://github.com/Kakulukian/youtube-transcript/issues/38) and ["works locally but throws YoutubeTranscriptDisabledError on Render"](https://github.com/Kakulukian/youtube-transcript/issues/54).

**youtube-transcript-cloud keeps the same API, output and error classes, so your code doesn't change.** Each request runs on a hosted transcript API that deals with YouTube's blocks, so it behaves the same everywhere.

```diff
- import { YoutubeTranscript } from 'youtube-transcript';
+ import { YoutubeTranscript } from 'youtube-transcript-cloud';
```

## Install

```bash
npm install github:retracn/youtube-transcript-cloud-js
```

You need an Apify API token: create a [free Apify account](https://console.apify.com/sign-up), copy the token from [Settings → API & Integrations](https://console.apify.com/settings/integrations) and set `APIFY_TOKEN` (for example in your Vercel project's environment variables), or pass `{ apifyToken }`.

## Use it exactly like youtube-transcript

```js
import { YoutubeTranscript, fetchTranscript } from 'youtube-transcript-cloud';   // or require('youtube-transcript-cloud')

const transcript = await YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { lang: 'en' });
// [{ text: '[♪♪♪]', duration: 1680, offset: 1360, lang: 'en' }, ...]   offset and duration in milliseconds, as in youtube-transcript 1.3

const text = transcript.map((s) => s.text).join(' ');
```

The same error classes are exported and thrown in the same situations: `YoutubeTranscriptDisabledError`, `YoutubeTranscriptVideoUnavailableError`, `YoutubeTranscriptNotAvailableError`, `YoutubeTranscriptNotAvailableLanguageError` (with the available languages) and `YoutubeTranscriptError`. TypeScript types are included.

**Extra:** `YoutubeTranscript.fetchTranscripts(['id1', 'id2', …])` gets many videos in one request. It's faster and cheaper than a loop, and resolves to `{ [videoId]: transcript or error }`.

## Differences

| | youtube-transcript | youtube-transcript-cloud |
|---|---|---|
| Works from cloud servers | Often blocked | Yes |
| No `lang` given | First caption track (can be any language) | English when available, else the first track |
| `lang: 'en-GB'` | Exact code match only | Matches an `en` track too |
| Shorts and live URLs | Not parsed | Parsed |
| Speed | Under a second when not blocked | About 2–6 seconds per request |
| Cost | Free | $1.50 per 1,000 transcripts on your Apify account (videos without captions are free; the free plan's $5 monthly credit covers about 3,300) |

## How it works

`fetchTranscript()` calls [YouTube Transcript Scraper](https://apify.com/automationnation/youtube-transcript-scraper) through Apify's `run-sync-get-dataset-items` endpoint with your token. There's no other dependency. The same Actor also takes channel and playlist URLs, translations and plain-text output if you call it directly. For Python, see [youtube-transcript-cloud](https://github.com/retracn/youtube-transcript-cloud), the same idea for youtube-transcript-api.

Disclosure: I maintain the Actor this package calls. MIT licensed. Not affiliated with YouTube or with youtube-transcript.
