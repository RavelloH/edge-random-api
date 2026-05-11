import { API_DESCRIPTION } from "./api-description";

type Env = Record<string, never>;
type MaybePromise<T> = T | Promise<T>;

type RouteContext = {
  request: Request;
  url: URL;
  startedAt: number;
  resource: string;
  variants: string[];
  args: string[];
  routeType: string;
  rng: RandomSource;
  body: unknown;
  iteration: number;
};

type GeneratedValue = {
  kind: "value";
  data: unknown;
  type?: string;
  meta?: Record<string, unknown>;
  contentType?: string;
};

type RawGenerated = {
  kind: "raw";
  body: BodyInit | null;
  status?: number;
  headers?: HeadersInit;
};

type Generated = unknown;

type Handler = (ctx: RouteContext) => MaybePromise<unknown>;

const MAX_COUNT = 100;
const MAX_BYTES = 65_536;
const MAX_FILE_BYTES = 1_048_576;
const MAX_ROWS = 1_000;
const MAX_COLUMNS = 50;
const MAX_DEPTH = 6;
const MAX_DELAY_MS = 5_000;
const DEFAULT_HEADERS: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Cache-Control": "no-store"
};

const WORDS = [
  "amber",
  "anchor",
  "atlas",
  "binary",
  "canvas",
  "cedar",
  "cobalt",
  "delta",
  "ember",
  "fabric",
  "fable",
  "garden",
  "harbor",
  "icon",
  "juno",
  "kinetic",
  "lattice",
  "matrix",
  "neon",
  "orbit",
  "pixel",
  "quartz",
  "river",
  "signal",
  "thread",
  "umbra",
  "vector",
  "willow",
  "xenon",
  "yonder",
  "zenith"
];

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "minim",
  "veniam"
];

const FIRST_NAMES_MALE = ["Alex", "Benjamin", "Caleb", "Daniel", "Ethan", "Felix", "Henry", "Jonah", "Miles", "Noah"];
const FIRST_NAMES_FEMALE = ["Avery", "Clara", "Elena", "Grace", "Hazel", "Iris", "Maya", "Nora", "Sofia", "Zoe"];
const LAST_NAMES = ["Chen", "Carter", "Davis", "Garcia", "Ito", "Kim", "Martinez", "Nguyen", "Patel", "Smith", "Taylor"];
const COMPANIES = ["Northstar Labs", "Bluefield Systems", "Cedar Logic", "Vector Forge", "Harbor Metrics", "Atlas Cloud"];
const JOB_TITLES = ["Engineer", "Designer", "Product Manager", "Data Analyst", "Operations Lead", "Security Specialist"];
const DEPARTMENTS = ["Engineering", "Design", "Product", "Data", "Operations", "Security", "Finance"];
const PRODUCTS = ["Notebook", "Wireless Mouse", "Desk Lamp", "Travel Pack", "Monitor Stand", "Mechanical Keyboard"];
const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CNY", "CAD", "AUD", "CHF"];
const COUNTRIES = [
  { code: "US", name: "United States", cities: ["New York", "Seattle", "Austin", "Chicago"], currency: "USD", locale: "en-US", language: "English", timezone: "America/New_York" },
  { code: "CN", name: "China", cities: ["Shanghai", "Beijing", "Shenzhen", "Hangzhou"], currency: "CNY", locale: "zh-CN", language: "Chinese", timezone: "Asia/Shanghai" },
  { code: "DE", name: "Germany", cities: ["Berlin", "Munich", "Hamburg", "Cologne"], currency: "EUR", locale: "de-DE", language: "German", timezone: "Europe/Berlin" },
  { code: "JP", name: "Japan", cities: ["Tokyo", "Osaka", "Kyoto", "Fukuoka"], currency: "JPY", locale: "ja-JP", language: "Japanese", timezone: "Asia/Tokyo" },
  { code: "GB", name: "United Kingdom", cities: ["London", "Manchester", "Bristol", "Edinburgh"], currency: "GBP", locale: "en-GB", language: "English", timezone: "Europe/London" }
];
const STREET_NAMES = ["Market", "Oak", "Pine", "Cedar", "Lake", "Hill", "Maple", "River", "Park", "Sunset"];
const MIME_TYPES = ["application/json", "text/plain", "text/csv", "image/svg+xml", "application/xml", "application/octet-stream"];
const USER_AGENTS = {
  desktop: [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15"
  ],
  mobile: [
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36"
  ],
  tablet: [
    "Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1"
  ]
};

const HANDLERS: Record<string, Handler> = {
  entropy,
  randomness,
  num,
  float,
  decimal,
  str,
  bool,
  null: () => null,
  password,
  passphrase,
  pin,
  otp,
  token,
  apikey,
  secret: secureNamedToken,
  nonce: secureNamedToken,
  csrf: secureNamedToken,
  sessionid: secureNamedToken,
  "recovery-codes": recoveryCodes,
  crypto: cryptoBytes,
  hash,
  sshkey,
  jwt,
  uuid,
  ulid,
  nanoid,
  cuid2,
  objectid,
  ksuid,
  xid,
  snowflake,
  traceid,
  spanid,
  prime,
  gaussian,
  poisson,
  bernoulli,
  uniform,
  exponential,
  "weighted-pick": weightedPick,
  sample,
  shuffle,
  range,
  vector,
  matrix,
  lorem,
  words,
  sentence,
  paragraph,
  markdown,
  quote,
  name,
  username,
  email,
  phone,
  bio,
  person,
  user,
  company,
  job,
  product,
  price,
  money,
  creditcard,
  iban,
  orderid,
  order,
  invoice,
  sku,
  barcode,
  ip,
  mac,
  port,
  useragent,
  domain,
  url: randomUrl,
  mime,
  cron,
  headers,
  cookies,
  status,
  redirect,
  delay,
  color,
  palette,
  geo,
  geohash,
  country,
  city,
  address,
  street,
  postalcode,
  timezone,
  locale,
  currency,
  language,
  date,
  datetime,
  timestamp,
  duration,
  "relative-date": relativeDate,
  "business-day": businessDay,
  weekday,
  month,
  semver,
  slug,
  base64,
  base32,
  hex,
  urlencoded,
  regex,
  env,
  git,
  file,
  csv,
  tsv,
  json,
  xml,
  yaml,
  svg,
  avatar,
  edgecase,
  invalid,
  fuzz,
  payload,
  log,
  metric,
  trace,
  span,
  alert,
  "api-response": apiResponse,
  graphql,
  table,
  schema,
  mock,
  scenario
};

export default {
  async fetch(request: Request, env: Env, executionContext: ExecutionContext): Promise<Response> {
    void env;
    void executionContext;
    const startedAt = now();

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: DEFAULT_HEADERS });
    }

    try {
      const url = new URL(request.url);
      const pathname = normalizePath(url.pathname);

      if (pathname === "/") {
        return respondJson(withDynamicBaseUrl(request, url), request.method === "HEAD");
      }

      const [resourceSpec, ...args] = pathname.slice(1).split("/").map(decodePathPart);
      const { resource, variants } = parseResourceSpec(resourceSpec);
      const handler = HANDLERS[resource];

      if (!handler) {
        throw new HttpError(404, `Unknown endpoint: /${resourceSpec}`);
      }

      if (!isMethodAllowed(resource, request.method)) {
        throw new HttpError(405, `${resource} requires ${resource === "schema" || resource === "mock" ? "POST" : "GET"}`);
      }

      const body = request.method === "POST" ? await readRequestBody(request) : undefined;
      const seed = url.searchParams.get("seed") ?? undefined;
      const rng = new RandomSource(seed ? `${seed}|${canonicalRequestKey(request.method, url)}` : undefined);
      const routeType = variants.length > 0 ? `${resource}:${variants.join("+")}` : resource;
      const count = queryInt(url.searchParams, "count", 1, 1, MAX_COUNT);
      const ctx: RouteContext = {
        request,
        url,
        startedAt,
        resource,
        variants,
        args,
        routeType,
        rng,
        body,
        iteration: 0
      };

      const generatedItems: unknown[] = [];
      let firstMeta: Record<string, unknown> | undefined;
      let contentType: string | undefined;
      let responseType = routeType;

      for (let index = 0; index < count; index += 1) {
        ctx.iteration = index;
        const result = normalizeGenerated(await handler(ctx));

        if (result.kind === "raw") {
          if (count > 1) {
            throw new HttpError(400, "Raw binary/text endpoints do not support count > 1.");
          }
          return respondRaw(result, request.method === "HEAD");
        }

        generatedItems.push(result.data);
        firstMeta ??= result.meta;
        contentType ??= result.contentType;
        responseType = result.type ?? responseType;
      }

      const data = count === 1 ? generatedItems[0] : generatedItems;
      return respondGenerated({ data, ctx, count, startedAt, type: responseType, meta: firstMeta, contentType });
    } catch (error) {
      return respondError(error, request.method === "HEAD");
    }
  }
} satisfies ExportedHandler<Env>;

function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/{2,}/g, "/");
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function decodePathPart(part: string): string {
  try {
    return decodeURIComponent(part);
  } catch {
    throw new HttpError(400, `Invalid path segment: ${part}`);
  }
}

function parseResourceSpec(spec: string): { resource: string; variants: string[] } {
  const colon = spec.indexOf(":");
  if (colon === -1) {
    return { resource: spec.toLowerCase(), variants: [] };
  }
  const resource = spec.slice(0, colon).toLowerCase();
  const variants = spec
    .slice(colon + 1)
    .split("+")
    .map((variant) => variant.trim().toLowerCase())
    .filter(Boolean);
  return { resource, variants };
}

function isMethodAllowed(resource: string, method: string): boolean {
  if (method === "HEAD") {
    return resource !== "schema" && resource !== "mock";
  }
  if (resource === "schema" || resource === "mock") {
    return method === "POST";
  }
  return method === "GET";
}

async function readRequestBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType || request.headers.get("content-length") === "0") {
    return undefined;
  }
  if (contentType.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      throw new HttpError(400, "Request body must be valid JSON.");
    }
  }
  return await request.text();
}

function withDynamicBaseUrl(request: Request, url: URL): unknown {
  const host = request.headers.get("host") ?? url.host;
  const proto = (request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "")).split(",")[0].trim();
  const description = JSON.parse(JSON.stringify(API_DESCRIPTION)) as Record<string, unknown>;
  description.base_url = `${proto}://${host}`;
  description.github = {
    repository: "RavelloH/edge-random-api",
    url: "https://github.com/RavelloH/edge-random-api"
  };
  return description;
}

function canonicalRequestKey(method: string, url: URL): string {
  const query = [...url.searchParams.entries()]
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => `${leftKey}=${leftValue}`.localeCompare(`${rightKey}=${rightValue}`))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
  return `${method.toUpperCase()} ${url.pathname}${query ? `?${query}` : ""}`;
}

function now(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: unknown
  ) {
    super(message);
  }
}

class RandomSource {
  readonly seeded: boolean;
  private readonly nextSeeded?: () => number;

  constructor(seed?: string) {
    this.seeded = Boolean(seed);
    if (seed) {
      const seedMaker = xmur3(seed);
      this.nextSeeded = sfc32(seedMaker(), seedMaker(), seedMaker(), seedMaker());
    }
  }

  float(): number {
    if (this.nextSeeded) {
      return this.nextSeeded();
    }
    const bytes = new Uint32Array(1);
    crypto.getRandomValues(bytes);
    return bytes[0] / 0x1_0000_0000;
  }

  int(min: number, max: number): number {
    const [low, high] = min <= max ? [Math.ceil(min), Math.floor(max)] : [Math.ceil(max), Math.floor(min)];
    if (low === high) {
      return low;
    }
    return Math.floor(this.float() * (high - low + 1)) + low;
  }

  number(min: number, max: number): number {
    const [low, high] = min <= max ? [min, max] : [max, min];
    return this.float() * (high - low) + low;
  }

  bool(probability = 0.5): boolean {
    return this.float() < clamp(probability, 0, 1);
  }

  bytes(length: number, maxBytes = MAX_BYTES): Uint8Array {
    const size = clampInt(length, 0, maxBytes);
    const bytes = new Uint8Array(size);
    if (this.nextSeeded) {
      for (let index = 0; index < bytes.length; index += 1) {
        bytes[index] = Math.floor(this.float() * 256);
      }
      return bytes;
    }

    for (let offset = 0; offset < bytes.length; offset += 65_536) {
      crypto.getRandomValues(bytes.subarray(offset, Math.min(offset + 65_536, bytes.length)));
    }
    return bytes;
  }

  pick<T>(items: readonly T[]): T {
    if (items.length === 0) {
      throw new HttpError(400, "Cannot pick from an empty list.");
    }
    return items[this.int(0, items.length - 1)];
  }

  shuffle<T>(items: readonly T[]): T[] {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const other = this.int(0, index);
      [copy[index], copy[other]] = [copy[other], copy[index]];
    }
    return copy;
  }
}

function xmur3(input: string): () => number {
  let hash = 1779033703 ^ input.length;
  for (let index = 0; index < input.length; index += 1) {
    hash = Math.imul(hash ^ input.charCodeAt(index), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return () => {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    return (hash ^= hash >>> 16) >>> 0;
  };
}

function sfc32(a: number, b: number, c: number, d: number): () => number {
  return () => {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    const t = (a + b + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 0x1_0000_0000;
  };
}

function normalizeGenerated(result: unknown): GeneratedValue | RawGenerated {
  if (isGeneratedValue(result) || isRawGenerated(result)) {
    return result;
  }
  return value(result);
}

function value(data: unknown, options: Omit<GeneratedValue, "kind" | "data"> = {}): GeneratedValue {
  return { kind: "value", data, ...options };
}

function raw(body: BodyInit | null, options: Omit<RawGenerated, "kind" | "body"> = {}): RawGenerated {
  return { kind: "raw", body, ...options };
}

function isGeneratedValue(result: unknown): result is GeneratedValue {
  return Boolean(result && typeof result === "object" && (result as { kind?: unknown }).kind === "value");
}

function isRawGenerated(result: unknown): result is RawGenerated {
  return Boolean(result && typeof result === "object" && (result as { kind?: unknown }).kind === "raw");
}

function respondGenerated(input: {
  data: unknown;
  ctx: RouteContext;
  count: number;
  startedAt: number;
  type: string;
  meta?: Record<string, unknown>;
  contentType?: string;
}): Response {
  const format = input.ctx.url.searchParams.get("format") ?? "json";
  if (format === "text") {
    const contentType = input.contentType ?? "text/plain; charset=utf-8";
    return respondText(stringifyText(input.data), contentType, input.ctx.request.method === "HEAD");
  }
  if (format !== "json") {
    throw new HttpError(400, "Unsupported format. Use json or text.");
  }

  return respondJson(
    {
      status: 200,
      meta: {
        type: input.type,
        count: input.count,
        timestamp: new Date().toISOString(),
        latency_ms: round(now() - input.startedAt, 3),
        randomness: randomnessMeta(input.ctx.rng),
        ...input.meta
      },
      data: input.data
    },
    input.ctx.request.method === "HEAD"
  );
}

function respondRaw(result: RawGenerated, head = false): Response {
  return new Response(head ? null : result.body, {
    status: result.status ?? 200,
    headers: mergeHeaders(DEFAULT_HEADERS, result.headers)
  });
}

function respondJson(body: unknown, head = false, status = 200): Response {
  return new Response(head ? null : JSON.stringify(body, null, 2), {
    status,
    headers: mergeHeaders(DEFAULT_HEADERS, { "Content-Type": "application/json; charset=utf-8" })
  });
}

function respondText(body: string, contentType = "text/plain; charset=utf-8", head = false, status = 200): Response {
  return new Response(head ? null : body, {
    status,
    headers: mergeHeaders(DEFAULT_HEADERS, { "Content-Type": contentType })
  });
}

function respondError(error: unknown, head = false): Response {
  const status = error instanceof HttpError ? error.status : 500;
  const message = error instanceof Error ? error.message : "Internal server error";
  return respondJson(
    {
      status,
      error: {
        message,
        ...(error instanceof HttpError && error.details !== undefined ? { details: error.details } : {})
      }
    },
    head,
    status
  );
}

function mergeHeaders(...sources: Array<HeadersInit | undefined>): Headers {
  const headers = new Headers();
  for (const source of sources) {
    if (!source) {
      continue;
    }
    new Headers(source).forEach((value, key) => headers.set(key, value));
  }
  return headers;
}

function stringifyText(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }
  if (data === null || typeof data === "number" || typeof data === "boolean") {
    return String(data);
  }
  if (Array.isArray(data)) {
    return data.map((item) => (typeof item === "object" ? JSON.stringify(item) : String(item))).join("\n");
  }
  return JSON.stringify(data, null, 2);
}

function randomnessMeta(rng: RandomSource): { source: string; seeded: boolean; security: string } {
  return {
    source: rng.seeded ? "deterministic_prng" : "web_crypto_csprng",
    seeded: rng.seeded,
    security: rng.seeded ? "deterministic" : "cryptographically_secure"
  };
}

function queryInt(params: URLSearchParams, name: string, fallback: number, min: number, max: number): number {
  return parseIntBounded(params.get(name), fallback, min, max);
}

function queryFloat(params: URLSearchParams, name: string, fallback: number, min: number, max: number): number {
  return parseFloatBounded(params.get(name), fallback, min, max);
}

function parseIntBounded(value: string | null | undefined, fallback: number, min: number, max: number): number {
  if (value === null || value === undefined || value === "") {
    return clampInt(fallback, min, max);
  }
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) {
    throw new HttpError(400, `Expected integer but received "${value}".`);
  }
  return clampInt(parsed, min, max);
}

function parseFloatBounded(value: string | null | undefined, fallback: number, min: number, max: number): number {
  if (value === null || value === undefined || value === "") {
    return clamp(fallback, min, max);
  }
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    throw new HttpError(400, `Expected number but received "${value}".`);
  }
  return clamp(parsed, min, max);
}

function argInt(ctx: RouteContext, index: number, fallback: number, min: number, max: number): number {
  return parseIntBounded(ctx.args[index], fallback, min, max);
}

function argFloat(ctx: RouteContext, index: number, fallback: number, min: number, max: number): number {
  return parseFloatBounded(ctx.args[index], fallback, min, max);
}

function rangeFromArgs(ctx: RouteContext, defaultMin: number, defaultMax: number, minCap = -1_000_000_000, maxCap = 1_000_000_000): [number, number] {
  if (ctx.args.length === 0) {
    return [defaultMin, defaultMax];
  }
  if (ctx.args.length === 1) {
    return [0, parseFloatBounded(ctx.args[0], defaultMax, minCap, maxCap)];
  }
  return [
    parseFloatBounded(ctx.args[0], defaultMin, minCap, maxCap),
    parseFloatBounded(ctx.args[1], defaultMax, minCap, maxCap)
  ];
}

function lengthFromArgs(ctx: RouteContext, fallback: number, max: number): number {
  if (ctx.args.length >= 2) {
    const min = parseIntBounded(ctx.args[0], fallback, 0, max);
    const high = parseIntBounded(ctx.args[1], fallback, 0, max);
    return ctx.rng.int(Math.min(min, high), Math.max(min, high));
  }
  return argInt(ctx, 0, fallback, 0, max);
}

function clamp(valueToClamp: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, valueToClamp));
}

function clampInt(valueToClamp: number, min: number, max: number): number {
  return Math.trunc(clamp(valueToClamp, min, max));
}

function round(valueToRound: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(valueToRound * factor) / factor;
}

function bytesToHex(bytes: Uint8Array): string {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function bytesToArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  return bytesToBase64(bytes).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function encodeBytes(bytes: Uint8Array, encoding: string): string {
  switch (encoding) {
    case "hex":
      return bytesToHex(bytes);
    case "base64":
      return bytesToBase64(bytes);
    case "base64url":
      return bytesToBase64Url(bytes);
    case "base32":
      return base32Encode(bytes);
    case "base58":
      return baseNEncode(bytes, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
    default:
      throw new HttpError(400, `Unsupported encoding: ${encoding}`);
  }
}

function base32Encode(bytes: Uint8Array, alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"): string {
  let output = "";
  let bits = 0;
  let value = 0;
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }
  return output;
}

function baseNEncode(bytes: Uint8Array, alphabet: string): string {
  if (bytes.length === 0) {
    return "";
  }
  const base = alphabet.length;
  const digits = [0];
  for (const byte of bytes) {
    let carry = byte;
    for (let index = 0; index < digits.length; index += 1) {
      carry += digits[index] << 8;
      digits[index] = carry % base;
      carry = Math.floor(carry / base);
    }
    while (carry > 0) {
      digits.push(carry % base);
      carry = Math.floor(carry / base);
    }
  }
  return digits.reverse().map((digit) => alphabet[digit]).join("");
}

function randomString(rng: RandomSource, length: number, charset: string): string {
  let output = "";
  for (let index = 0; index < length; index += 1) {
    output += charset[rng.int(0, charset.length - 1)];
  }
  return output;
}

function safeIdentifier(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/(^-|-$)/gu, "");
}

function splitCsv(valueToSplit: string | null, fallback: string[]): string[] {
  if (!valueToSplit) {
    return fallback;
  }
  return valueToSplit
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function pickCountry(ctx: RouteContext): (typeof COUNTRIES)[number] {
  const code = ctx.url.searchParams.get("country")?.toUpperCase();
  return COUNTRIES.find((countryItem) => countryItem.code === code) ?? ctx.rng.pick(COUNTRIES);
}

function endpointWarning(message: string): Record<string, unknown> {
  return { warning: message };
}

function entropy(ctx: RouteContext): Generated {
  const encoding = ctx.variants[0] ?? "base64url";
  const bytes = ctx.rng.bytes(argInt(ctx, 0, 32, 1, MAX_BYTES));
  return {
    bytes: bytes.length,
    encoding,
    value: encodeBytes(bytes, encoding)
  };
}

function randomness(ctx: RouteContext): Generated {
  if (ctx.variants.includes("test")) {
    const sampleSize = queryInt(ctx.url.searchParams, "bytes", 1024, 1, 16_384);
    const bytes = ctx.rng.bytes(sampleSize);
    const frequencies = new Array<number>(256).fill(0);
    for (const byte of bytes) {
      frequencies[byte] += 1;
    }
    const nonZeroBuckets = frequencies.filter(Boolean).length;
    return {
      sample_bytes: sampleSize,
      distinct_byte_values: nonZeroBuckets,
      duplicate_byte_values: sampleSize - nonZeroBuckets,
      min_frequency: Math.min(...frequencies),
      max_frequency: Math.max(...frequencies),
      mean_frequency: round(sampleSize / 256, 4),
      chi_square: round(frequencies.reduce((sum, observed) => sum + ((observed - sampleSize / 256) ** 2) / (sampleSize / 256), 0), 4)
    };
  }
  return {
    ...randomnessMeta(ctx.rng),
    true_random: false,
    runtime: "cloudflare_worker",
    seeded_note: ctx.rng.seeded ? "Deterministic output; do not use as cryptographic randomness." : undefined
  };
}

function num(ctx: RouteContext): Generated {
  const [min, max] = rangeFromArgs(ctx, 0, 100, -9_007_199_254_740_991, 9_007_199_254_740_991);
  return ctx.rng.int(min, max);
}

function float(ctx: RouteContext): Generated {
  const [min, max] = rangeFromArgs(ctx, 0, 1);
  return ctx.rng.number(min, max);
}

function decimal(ctx: RouteContext): Generated {
  const precision = queryInt(ctx.url.searchParams, "precision", 2, 0, 20);
  const [min, max] = rangeFromArgs(ctx, 0, 1_000_000);
  return ctx.rng.number(min, max).toFixed(precision);
}

function str(ctx: RouteContext): Generated {
  const charsets: Record<string, string> = {
    alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    num: "0123456789",
    alnum: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    hex: "0123456789abcdef",
    symbol: "!@#$%^&*_-+=?~",
    base32: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    base58: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    base64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    base64url: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
  };
  const selected = ctx.variants.length > 0 ? ctx.variants : ["alnum"];
  const charset = selected
    .map((variant) => charsets[variant] ?? (variant === "alpha+num" ? charsets.alnum : undefined))
    .filter((valueToKeep): valueToKeep is string => Boolean(valueToKeep))
    .join("");
  if (!charset) {
    throw new HttpError(400, `Unsupported charset: ${selected.join("+")}`);
  }
  return randomString(ctx.rng, lengthFromArgs(ctx, 16, 4096), charset);
}

function bool(ctx: RouteContext): Generated {
  return ctx.rng.bool(argFloat(ctx, 0, 0.5, 0, 1));
}

function password(ctx: RouteContext): Generated {
  const length = argInt(ctx, 0, 16, 4, 256);
  const groups = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!@#$%^&*_-+=?~"];
  const required = groups.map((group) => ctx.rng.pick([...group]));
  const rest = randomString(ctx.rng, length - required.length, groups.join(""));
  return ctx.rng.shuffle([...required, ...rest]).join("");
}

function passphrase(ctx: RouteContext): Generated {
  const count = argInt(ctx, 0, 4, 1, 24);
  const separator = ctx.url.searchParams.get("separator") ?? "-";
  return Array.from({ length: count }, () => ctx.rng.pick(WORDS)).join(separator.slice(0, 8));
}

function pin(ctx: RouteContext): Generated {
  const length = argInt(ctx, 0, 6, 1, 32);
  return randomString(ctx.rng, length, "0123456789");
}

function otp(ctx: RouteContext): Generated {
  return pin(ctx);
}

function token(ctx: RouteContext): Generated {
  const encoding = ctx.variants[0] ?? "base64url";
  const bytes = ctx.rng.bytes(argInt(ctx, 0, 32, 1, MAX_BYTES));
  return encodeBytes(bytes, encoding);
}

function apikey(ctx: RouteContext): Generated {
  const prefix = ctx.url.searchParams.get("prefix") ?? "key";
  return `${safeIdentifier(prefix) || "key"}_${bytesToBase64Url(ctx.rng.bytes(24))}`;
}

function secureNamedToken(ctx: RouteContext): Generated {
  const bytes = ctx.rng.bytes(argInt(ctx, 0, 32, 1, MAX_BYTES));
  return `${ctx.resource}_${bytesToBase64Url(bytes)}`;
}

function recoveryCodes(ctx: RouteContext): Generated {
  const count = argInt(ctx, 0, 8, 1, 100);
  const length = queryInt(ctx.url.searchParams, "length", 10, 4, 64);
  return Array.from({ length: count }, () => randomString(ctx.rng, length, "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"));
}

function cryptoBytes(ctx: RouteContext): Generated {
  return token(ctx);
}

async function hash(ctx: RouteContext): Promise<Generated> {
  const algorithm = ctx.variants[0] ?? "sha256";
  if (algorithm === "md5") {
    return value(bytesToHex(ctx.rng.bytes(16)), {
      meta: endpointWarning("MD5 output is a random mock checksum string, not a Web Crypto MD5 digest.")
    });
  }
  const mapping: Record<string, AlgorithmIdentifier> = {
    sha1: "SHA-1",
    sha256: "SHA-256",
    sha512: "SHA-512"
  };
  const digestAlgorithm = mapping[algorithm];
  if (!digestAlgorithm) {
    throw new HttpError(400, `Unsupported hash algorithm: ${algorithm}`);
  }
  const input = ctx.rng.bytes(queryInt(ctx.url.searchParams, "bytes", 64, 1, MAX_BYTES));
  const digest = await crypto.subtle.digest(digestAlgorithm, bytesToArrayBuffer(input));
  return value(bytesToHex(new Uint8Array(digest)), {
    meta: algorithm === "sha1" ? endpointWarning("SHA-1 is included for test data compatibility only.") : undefined
  });
}

function sshkey(ctx: RouteContext): Generated {
  const type = ctx.variants[0] === "rsa" ? "rsa" : "ed25519";
  const keyType = type === "rsa" ? "ssh-rsa" : "ssh-ed25519";
  return value(`${keyType} ${bytesToBase64(ctx.rng.bytes(type === "rsa" ? 256 : 32))} mock@edge-random-api`, {
    meta: endpointWarning("Mock public key string for UI/parser tests only. It is not a usable SSH key pair.")
  });
}

function jwt(ctx: RouteContext): Generated {
  const variant = ctx.variants[0] ?? "hs256";
  const alg = variant === "none" ? "none" : variant === "rs256" ? "RS256" : "HS256";
  const header = bytesToBase64Url(textBytes(JSON.stringify({ alg, typ: "JWT" })));
  const payload = bytesToBase64Url(
    textBytes(
      JSON.stringify({
        sub: uuidV4(ctx.rng),
        name: randomFullName(ctx),
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      })
    )
  );
  const signature = alg === "none" ? "" : bytesToBase64Url(ctx.rng.bytes(32));
  return value(`${header}.${payload}.${signature}`, {
    meta: endpointWarning("Mock JWT-shaped value for parser tests only. The signature is not trusted.")
  });
}

function uuid(ctx: RouteContext): Generated {
  return ctx.variants[0] === "v7" ? uuidV7(ctx.rng) : uuidV4(ctx.rng);
}

function uuidV4(rng: RandomSource): string {
  const bytes = rng.bytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return formatUuid(bytes);
}

function uuidV7(rng: RandomSource): string {
  const bytes = rng.bytes(16);
  const timestamp = Date.now();
  bytes[0] = (timestamp / 0x1_0000_0000_00) & 0xff;
  bytes[1] = (timestamp / 0x1_0000_0000) & 0xff;
  bytes[2] = (timestamp >>> 24) & 0xff;
  bytes[3] = (timestamp >>> 16) & 0xff;
  bytes[4] = (timestamp >>> 8) & 0xff;
  bytes[5] = timestamp & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return formatUuid(bytes);
}

function formatUuid(bytes: Uint8Array): string {
  const hexValue = bytesToHex(bytes);
  return `${hexValue.slice(0, 8)}-${hexValue.slice(8, 12)}-${hexValue.slice(12, 16)}-${hexValue.slice(16, 20)}-${hexValue.slice(20)}`;
}

function ulid(ctx: RouteContext): Generated {
  const time = Date.now();
  const timeBytes = new Uint8Array(6);
  for (let index = 5, valueToWrite = time; index >= 0; index -= 1) {
    timeBytes[index] = valueToWrite & 0xff;
    valueToWrite = Math.floor(valueToWrite / 256);
  }
  return `${base32Encode(timeBytes, "0123456789ABCDEFGHJKMNPQRSTVWXYZ").slice(0, 10)}${base32Encode(ctx.rng.bytes(10), "0123456789ABCDEFGHJKMNPQRSTVWXYZ").slice(0, 16)}`;
}

function nanoid(ctx: RouteContext): Generated {
  return randomString(ctx.rng, argInt(ctx, 0, 21, 1, 256), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-");
}

function cuid2(ctx: RouteContext): Generated {
  return `c${randomString(ctx.rng, 23, "abcdefghijklmnopqrstuvwxyz0123456789")}`;
}

function objectid(ctx: RouteContext): Generated {
  const timeHex = Math.floor(Date.now() / 1000).toString(16).padStart(8, "0");
  return `${timeHex}${bytesToHex(ctx.rng.bytes(8))}`;
}

function ksuid(ctx: RouteContext): Generated {
  const timestamp = Math.floor(Date.now() / 1000) - 1_400_000_000;
  const bytes = new Uint8Array(20);
  bytes[0] = (timestamp >>> 24) & 0xff;
  bytes[1] = (timestamp >>> 16) & 0xff;
  bytes[2] = (timestamp >>> 8) & 0xff;
  bytes[3] = timestamp & 0xff;
  bytes.set(ctx.rng.bytes(16), 4);
  return baseNEncode(bytes, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").padStart(27, "0");
}

function xid(ctx: RouteContext): Generated {
  return base32Encode(ctx.rng.bytes(12), "0123456789abcdefghijklmnopqrstuv").slice(0, 20);
}

function snowflake(ctx: RouteContext): Generated {
  const customEpoch = BigInt(queryInt(ctx.url.searchParams, "epoch", 1_420_070_400_000, 0, Date.now()));
  const timestampPart = BigInt(Date.now()) - customEpoch;
  const workerPart = BigInt(ctx.rng.int(0, 1023));
  const sequencePart = BigInt(ctx.rng.int(0, 4095));
  return ((timestampPart << 22n) | (workerPart << 12n) | sequencePart).toString();
}

function traceid(ctx: RouteContext): Generated {
  let id = bytesToHex(ctx.rng.bytes(16));
  if (/^0+$/u.test(id)) {
    id = `1${id.slice(1)}`;
  }
  return id;
}

function spanid(ctx: RouteContext): Generated {
  let id = bytesToHex(ctx.rng.bytes(8));
  if (/^0+$/u.test(id)) {
    id = `1${id.slice(1)}`;
  }
  return id;
}

function prime(ctx: RouteContext): Generated {
  const [rawMin, rawMax] = rangeFromArgs(ctx, 2, 10_000, 2, 1_000_000);
  const min = Math.max(2, Math.trunc(Math.min(rawMin, rawMax)));
  const max = Math.max(min, Math.trunc(Math.max(rawMin, rawMax)));
  for (let attempts = 0; attempts < 2_000; attempts += 1) {
    const candidate = ctx.rng.int(min, max);
    if (isPrime(candidate)) {
      return candidate;
    }
  }
  for (let candidate = min; candidate <= max; candidate += 1) {
    if (isPrime(candidate)) {
      return candidate;
    }
  }
  throw new HttpError(400, `No prime found in range ${min}..${max}.`);
}

function isPrime(valueToCheck: number): boolean {
  if (valueToCheck < 2) {
    return false;
  }
  if (valueToCheck % 2 === 0) {
    return valueToCheck === 2;
  }
  for (let divisor = 3; divisor * divisor <= valueToCheck; divisor += 2) {
    if (valueToCheck % divisor === 0) {
      return false;
    }
  }
  return true;
}

function gaussian(ctx: RouteContext): Generated {
  const mean = argFloat(ctx, 0, 0, -1_000_000, 1_000_000);
  const std = argFloat(ctx, 1, 1, 0, 1_000_000);
  const u1 = Math.max(ctx.rng.float(), Number.EPSILON);
  const u2 = ctx.rng.float();
  return mean + std * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function poisson(ctx: RouteContext): Generated {
  const lambda = argFloat(ctx, 0, 1, 0.0001, 1000);
  const limit = Math.exp(-lambda);
  let k = 0;
  let productValue = 1;
  do {
    k += 1;
    productValue *= ctx.rng.float();
  } while (productValue > limit && k < 10_000);
  return k - 1;
}

function bernoulli(ctx: RouteContext): Generated {
  return ctx.rng.bool(argFloat(ctx, 0, 0.5, 0, 1)) ? 1 : 0;
}

function uniform(ctx: RouteContext): Generated {
  const [min, max] = rangeFromArgs(ctx, 0, 1);
  return ctx.rng.number(min, max);
}

function exponential(ctx: RouteContext): Generated {
  const lambda = argFloat(ctx, 0, 1, 0.0001, 1_000_000);
  return -Math.log(1 - ctx.rng.float()) / lambda;
}

function weightedPick(ctx: RouteContext): Generated {
  const items = splitCsv(ctx.url.searchParams.get("items"), ["red", "green", "blue"]);
  const weights = splitCsv(ctx.url.searchParams.get("weights"), items.map(() => "1")).map((item) => Number.parseFloat(item));
  const normalizedWeights = items.map((_, index) => Math.max(0, Number.isFinite(weights[index]) ? weights[index] : 1));
  const total = normalizedWeights.reduce((sum, weight) => sum + weight, 0);
  if (total <= 0) {
    throw new HttpError(400, "weights must contain at least one positive value.");
  }
  let cursor = ctx.rng.number(0, total);
  for (let index = 0; index < items.length; index += 1) {
    cursor -= normalizedWeights[index];
    if (cursor <= 0) {
      return items[index];
    }
  }
  return items.at(-1);
}

function sample(ctx: RouteContext): Generated {
  const items = splitCsv(ctx.url.searchParams.get("items"), ["a", "b", "c", "d", "e"]);
  const size = queryInt(ctx.url.searchParams, "size", Math.min(1, items.length), 0, Math.min(items.length, 1000));
  return ctx.rng.shuffle(items).slice(0, size);
}

function shuffle(ctx: RouteContext): Generated {
  return ctx.rng.shuffle(splitCsv(ctx.url.searchParams.get("items"), ["1", "2", "3", "4", "5"]));
}

function range(ctx: RouteContext): Generated {
  const min = argFloat(ctx, 0, 0, -1_000_000, 1_000_000);
  const max = argFloat(ctx, 1, 100, -1_000_000, 1_000_000);
  const step = queryFloat(ctx.url.searchParams, "step", 1, 0.000001, 1_000_000);
  const values: number[] = [];
  const direction = min <= max ? 1 : -1;
  for (let current = min; direction > 0 ? current <= max : current >= max; current += step * direction) {
    values.push(round(current, 6));
    if (values.length >= 10_000) {
      break;
    }
  }
  const size = ctx.url.searchParams.get("size");
  if (size !== null) {
    return ctx.rng.shuffle(values).slice(0, queryInt(ctx.url.searchParams, "size", 1, 0, Math.min(values.length, 1000)));
  }
  return values.slice(0, 1000);
}

function vector(ctx: RouteContext): Generated {
  const length = argInt(ctx, 0, 10, 0, 1000);
  const min = queryFloat(ctx.url.searchParams, "min", 0, -1_000_000, 1_000_000);
  const max = queryFloat(ctx.url.searchParams, "max", 1, -1_000_000, 1_000_000);
  return Array.from({ length }, () => round(ctx.rng.number(min, max), 6));
}

function matrix(ctx: RouteContext): Generated {
  const rows = argInt(ctx, 0, 3, 0, 100);
  const columns = argInt(ctx, 1, 3, 0, 100);
  const min = queryFloat(ctx.url.searchParams, "min", 0, -1_000_000, 1_000_000);
  const max = queryFloat(ctx.url.searchParams, "max", 1, -1_000_000, 1_000_000);
  return Array.from({ length: rows }, () => Array.from({ length: columns }, () => round(ctx.rng.number(min, max), 6)));
}

function lorem(ctx: RouteContext): Generated {
  const type = ctx.variants[0] ?? "sentence";
  const amount = argInt(ctx, 0, 1, 1, 100);
  if (type === "word") {
    return Array.from({ length: amount }, () => ctx.rng.pick(LOREM_WORDS)).join(" ");
  }
  if (type === "sentence") {
    return Array.from({ length: amount }, () => makeSentence(ctx, LOREM_WORDS)).join(" ");
  }
  if (type === "para" || type === "paragraph") {
    return Array.from({ length: amount }, () => makeParagraph(ctx, LOREM_WORDS)).join("\n\n");
  }
  if (type === "html") {
    return Array.from({ length: amount }, () => `<p>${escapeHtml(makeParagraph(ctx, LOREM_WORDS))}</p>`).join("");
  }
  throw new HttpError(400, `Unsupported lorem type: ${type}`);
}

function words(ctx: RouteContext): Generated {
  const count = argInt(ctx, 0, 5, 0, 1000);
  return Array.from({ length: count }, () => ctx.rng.pick(WORDS));
}

function sentence(ctx: RouteContext): Generated {
  const count = argInt(ctx, 0, 1, 1, 100);
  return Array.from({ length: count }, () => makeSentence(ctx, WORDS)).join(" ");
}

function paragraph(ctx: RouteContext): Generated {
  const count = argInt(ctx, 0, 1, 1, 20);
  return Array.from({ length: count }, () => makeParagraph(ctx, WORDS)).join("\n\n");
}

function makeSentence(ctx: RouteContext, dictionary: readonly string[]): string {
  const length = ctx.rng.int(6, 16);
  const text = Array.from({ length }, () => ctx.rng.pick(dictionary)).join(" ");
  return `${text[0].toUpperCase()}${text.slice(1)}.`;
}

function makeParagraph(ctx: RouteContext, dictionary: readonly string[]): string {
  return Array.from({ length: ctx.rng.int(3, 6) }, () => makeSentence(ctx, dictionary)).join(" ");
}

function markdown(ctx: RouteContext): Generated {
  const rows = Array.from({ length: 3 }, () => `| ${ctx.rng.pick(WORDS)} | ${ctx.rng.int(1, 100)} |`).join("\n");
  return `# ${titleCase(ctx.rng.pick(WORDS))} ${titleCase(ctx.rng.pick(WORDS))}\n\n${makeParagraph(ctx, WORDS)}\n\n- ${ctx.rng.pick(WORDS)}\n- ${ctx.rng.pick(WORDS)}\n- ${ctx.rng.pick(WORDS)}\n\n| name | value |\n| --- | ---: |\n${rows}\n\n\`\`\`json\n${JSON.stringify({ id: uuidV4(ctx.rng), ok: true }, null, 2)}\n\`\`\`\n`;
}

function quote(ctx: RouteContext): Generated {
  const quotes = [
    { text: "Make the interface honest and the data useful.", author: "Placeholder Author" },
    { text: "Small tools become durable when their edges are clear.", author: "Example Systems" },
    { text: "Reproducibility is a feature, not an accident.", author: "Test Fixture Notes" }
  ];
  return ctx.rng.pick(quotes);
}

function name(ctx: RouteContext): Generated {
  return randomFullName(ctx, ctx.variants[0]);
}

function randomFullName(ctx: RouteContext, gender = "any"): string {
  const first = gender === "male" ? ctx.rng.pick(FIRST_NAMES_MALE) : gender === "female" ? ctx.rng.pick(FIRST_NAMES_FEMALE) : ctx.rng.pick([...FIRST_NAMES_MALE, ...FIRST_NAMES_FEMALE]);
  return `${first} ${ctx.rng.pick(LAST_NAMES)}`;
}

function username(ctx: RouteContext): Generated {
  return `${ctx.rng.pick(WORDS)}_${ctx.rng.pick(WORDS)}${ctx.rng.int(10, 9999)}`.toLowerCase();
}

function email(ctx: RouteContext): Generated {
  const domainName = ctx.url.searchParams.get("domain") ?? "example.com";
  return `${String(username(ctx)).replace(/[^a-z0-9._-]/gu, "")}@${domainName}`;
}

function phone(ctx: RouteContext): Generated {
  const countryCode = ctx.url.searchParams.get("country")?.toUpperCase() ?? "US";
  if (countryCode === "CN") {
    return `+86 1${ctx.rng.int(30, 99)} ${ctx.rng.int(1000, 9999)} ${ctx.rng.int(1000, 9999)}`;
  }
  if (countryCode === "GB") {
    return `+44 7${ctx.rng.int(100, 999)} ${ctx.rng.int(100000, 999999)}`;
  }
  return `+1 (${ctx.rng.int(200, 999)}) ${ctx.rng.int(200, 999)}-${ctx.rng.int(0, 9999).toString().padStart(4, "0")}`;
}

function bio(ctx: RouteContext): Generated {
  return `${randomFullName(ctx)} is a ${ctx.rng.pick(JOB_TITLES).toLowerCase()} focused on ${ctx.rng.pick(WORDS)} systems and ${ctx.rng.pick(WORDS)} workflows.`;
}

function person(ctx: RouteContext): Generated {
  const fullName = randomFullName(ctx);
  const countryItem = pickCountry(ctx);
  return {
    id: uuidV4(ctx.rng),
    name: fullName,
    email: `${safeIdentifier(fullName)}@example.com`,
    phone: phone(ctx),
    address: makeAddress(ctx, countryItem),
    locale: countryItem.locale,
    timezone: countryItem.timezone
  };
}

function user(ctx: RouteContext): Generated {
  const profile = person(ctx) as Record<string, unknown>;
  return {
    id: profile.id,
    username: username(ctx),
    email: profile.email,
    name: profile.name,
    role: ctx.rng.pick(["admin", "editor", "viewer", "member"]),
    active: ctx.rng.bool(0.85),
    created_at: randomPastDate(ctx, 365).toISOString()
  };
}

function company(ctx: RouteContext): Generated {
  const companyName = ctx.rng.pick(COMPANIES);
  return {
    id: uuidV4(ctx.rng),
    name: companyName,
    domain: `${safeIdentifier(companyName)}.example`,
    employees: ctx.rng.int(5, 5000),
    industry: ctx.rng.pick(["Software", "Retail", "Finance", "Healthcare", "Education"])
  };
}

function job(ctx: RouteContext): Generated {
  return {
    title: ctx.rng.pick(JOB_TITLES),
    department: ctx.rng.pick(DEPARTMENTS),
    seniority: ctx.rng.pick(["Junior", "Mid", "Senior", "Staff", "Principal"])
  };
}

function product(ctx: RouteContext): Generated {
  return {
    id: sku(ctx),
    name: `${titleCase(ctx.rng.pick(WORDS))} ${ctx.rng.pick(PRODUCTS)}`,
    price: money(ctx),
    stock: ctx.rng.int(0, 500),
    category: ctx.rng.pick(["office", "travel", "electronics", "home"])
  };
}

function price(ctx: RouteContext): Generated {
  return money(ctx);
}

function money(ctx: RouteContext): Generated {
  const min = queryFloat(ctx.url.searchParams, "min", 1, -1_000_000, 1_000_000);
  const max = queryFloat(ctx.url.searchParams, "max", 1000, -1_000_000, 1_000_000);
  const currencyCode = ctx.url.searchParams.get("currency")?.toUpperCase() ?? ctx.rng.pick(CURRENCIES);
  const amount = round(ctx.rng.number(min, max), 2);
  return { amount, currency: currencyCode, formatted: `${currencyCode} ${amount.toFixed(2)}` };
}

function creditcard(ctx: RouteContext): Generated {
  const brand = ctx.variants[0] ?? ctx.rng.pick(["visa", "mastercard", "amex", "discover"]);
  const prefixes: Record<string, string> = { visa: "4", mastercard: "5", amex: "34", discover: "6011" };
  const lengths: Record<string, number> = { visa: 16, mastercard: 16, amex: 15, discover: 16 };
  const prefix = prefixes[brand] ?? prefixes.visa;
  const length = lengths[brand] ?? 16;
  const body = prefix + randomString(ctx.rng, length - prefix.length - 1, "0123456789");
  const check = luhnCheckDigit(body);
  return value(
    {
      brand,
      number: `${body}${check}`,
      exp_month: ctx.rng.int(1, 12).toString().padStart(2, "0"),
      exp_year: ctx.rng.int(2027, 2036),
      cvc: randomString(ctx.rng, brand === "amex" ? 4 : 3, "0123456789")
    },
    { meta: endpointWarning("Mock payment card for UI and validation tests only. It is not a real usable card.") }
  );
}

function luhnCheckDigit(input: string): number {
  let sum = 0;
  let doubleDigit = true;
  for (let index = input.length - 1; index >= 0; index -= 1) {
    let digit = Number.parseInt(input[index], 10);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }
  return (10 - (sum % 10)) % 10;
}

function iban(ctx: RouteContext): Generated {
  const countryCode = ctx.url.searchParams.get("country")?.toUpperCase() ?? ctx.rng.pick(["DE", "GB", "FR", "NL", "ES"]);
  return `${countryCode}${ctx.rng.int(10, 98)}${randomString(ctx.rng, 18, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")}`;
}

function orderid(ctx: RouteContext): Generated {
  return `ORD-${ctx.rng.int(100000, 999999)}-${randomString(ctx.rng, 4, "ABCDEFGHJKLMNPQRSTUVWXYZ")}`;
}

function order(ctx: RouteContext): Generated {
  const items = Array.from({ length: ctx.rng.int(1, 5) }, () => product(ctx) as { price: { amount: number } });
  const total = round(
    items.reduce<number>((sum, item) => {
      const moneyValue = item.price;
      return sum + moneyValue.amount;
    }, 0),
    2
  );
  return {
    id: orderid(ctx),
    user_id: uuidV4(ctx.rng),
    items,
    total,
    status: ctx.rng.pick(["pending", "paid", "shipped", "delivered", "cancelled"]),
    created_at: randomPastDate(ctx, 90).toISOString()
  };
}

function invoice(ctx: RouteContext): Generated {
  const due = randomFutureDate(ctx, 45);
  return {
    id: `INV-${ctx.rng.int(10000, 99999)}`,
    order_id: orderid(ctx),
    amount: money(ctx),
    due_date: due.toISOString().slice(0, 10),
    paid: ctx.rng.bool(0.65)
  };
}

function sku(ctx: RouteContext): Generated {
  return `${randomString(ctx.rng, 3, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")}-${ctx.rng.int(1000, 9999)}-${randomString(ctx.rng, 2, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")}`;
}

function barcode(ctx: RouteContext): Generated {
  const type = ctx.variants[0] ?? "ean13";
  if (type === "upc") {
    return randomString(ctx.rng, 12, "0123456789");
  }
  if (type === "code128") {
    return randomString(ctx.rng, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-");
  }
  return randomString(ctx.rng, 13, "0123456789");
}

function ip(ctx: RouteContext): Generated {
  const type = ctx.variants[0] ?? "v4";
  if (type === "v6") {
    return Array.from({ length: 8 }, () => ctx.rng.int(0, 0xffff).toString(16)).join(":");
  }
  return Array.from({ length: 4 }, () => ctx.rng.int(1, 254)).join(".");
}

function mac(ctx: RouteContext): Generated {
  const separator = ctx.variants[0] === "dash" ? "-" : ctx.variants[0] === "none" ? "" : ":";
  return Array.from({ length: 6 }, () => ctx.rng.int(0, 255).toString(16).padStart(2, "0")).join(separator);
}

function port(ctx: RouteContext): Generated {
  return ctx.rng.int(1024, 65535);
}

function useragent(ctx: RouteContext): Generated {
  const type = (ctx.variants[0] ?? "desktop") as keyof typeof USER_AGENTS;
  return ctx.rng.pick(USER_AGENTS[type] ?? USER_AGENTS.desktop);
}

function domain(ctx: RouteContext): Generated {
  return `${ctx.rng.pick(WORDS)}-${ctx.rng.pick(WORDS)}.${ctx.rng.pick(["com", "net", "org", "dev", "io"])}`.toLowerCase();
}

function randomUrl(ctx: RouteContext): Generated {
  return `https://${domain(ctx)}/${safeIdentifier(ctx.rng.pick(WORDS))}/${safeIdentifier(ctx.rng.pick(WORDS))}?id=${ctx.rng.int(1000, 9999)}`;
}

function mime(ctx: RouteContext): Generated {
  return ctx.rng.pick(MIME_TYPES);
}

function cron(ctx: RouteContext): Generated {
  return `${ctx.rng.int(0, 59)} ${ctx.rng.int(0, 23)} * * ${ctx.rng.int(0, 6)}`;
}

function headers(ctx: RouteContext): Generated {
  return {
    "x-request-id": uuidV4(ctx.rng),
    "content-type": ctx.rng.pick(MIME_TYPES),
    "cache-control": ctx.rng.pick(["no-store", "max-age=60", "public, max-age=3600"]),
    "user-agent": useragent(ctx)
  };
}

function cookies(ctx: RouteContext): Generated {
  const session = `session=${bytesToBase64Url(ctx.rng.bytes(16))}`;
  if (ctx.variants[0] === "response") {
    return `${session}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`;
  }
  return `${session}; theme=${ctx.rng.pick(["light", "dark", "system"])}`;
}

function status(ctx: RouteContext): Generated {
  const rawStatus = ctx.args[0] ?? "2xx";
  const classes: Record<string, number[]> = {
    "1xx": [100, 101, 102],
    "2xx": [200, 201, 202, 204],
    "3xx": [301, 302, 304, 307, 308],
    "4xx": [400, 401, 403, 404, 409, 422, 429],
    "5xx": [500, 502, 503, 504]
  };
  const code = classes[rawStatus] ? ctx.rng.pick(classes[rawStatus]) : parseIntBounded(rawStatus, 200, 100, 599);
  return { code, text: statusText(code) };
}

function statusText(code: number): string {
  const texts: Record<number, string> = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    301: "Moved Permanently",
    302: "Found",
    304: "Not Modified",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout"
  };
  return texts[code] ?? "HTTP Status";
}

function redirect(ctx: RouteContext): Generated {
  const count = argInt(ctx, 0, 3, 1, 20);
  return Array.from({ length: count }, (_, index) => ({
    step: index + 1,
    status: index === count - 1 ? 200 : ctx.rng.pick([301, 302, 307, 308]),
    location: index === count - 1 ? null : `/redirect-target/${index + 1}`
  }));
}

async function delay(ctx: RouteContext): Promise<Generated> {
  const maxMs = argInt(ctx, 0, 1000, 0, MAX_DELAY_MS);
  const actualMs = ctx.rng.int(0, maxMs);
  await new Promise((resolve) => setTimeout(resolve, actualMs));
  return { requested_max_ms: maxMs, delayed_ms: actualMs };
}

function color(ctx: RouteContext): Generated {
  const mode = ctx.variants[0] ?? "hex";
  const h = ctx.rng.int(0, 359);
  const s = ctx.rng.int(35, 90);
  const l = mode === "dark" ? ctx.rng.int(10, 35) : mode === "light" ? ctx.rng.int(65, 92) : ctx.rng.int(25, 75);
  const rgb = hslToRgb(h, s, l);
  if (mode === "rgb") {
    return { r: rgb[0], g: rgb[1], b: rgb[2], css: `rgb(${rgb.join(", ")})` };
  }
  if (mode === "hsl") {
    return { h, s, l, css: `hsl(${h} ${s}% ${l}%)` };
  }
  if (mode === "cmyk") {
    const cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);
    return { c: cmyk[0], m: cmyk[1], y: cmyk[2], k: cmyk[3], css_hex: rgbToHex(rgb) };
  }
  return rgbToHex(rgb);
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;
  const [r1, g1, b1] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
}

function rgbToHex(rgb: readonly number[]): string {
  return `#${rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  const rp = r / 255;
  const gp = g / 255;
  const bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);
  if (k === 1) {
    return [0, 0, 0, 100];
  }
  return [round(((1 - rp - k) / (1 - k)) * 100), round(((1 - gp - k) / (1 - k)) * 100), round(((1 - bp - k) / (1 - k)) * 100), round(k * 100)];
}

function palette(ctx: RouteContext): Generated {
  const count = argInt(ctx, 0, 5, 1, 24);
  const mode = ctx.variants[0] ?? "random";
  const base = ctx.rng.int(0, 359);
  return Array.from({ length: count }, (_, index) => {
    const hue = mode === "analogous" ? (base + index * 24) % 360 : mode === "complementary" ? (base + (index % 2) * 180 + Math.floor(index / 2) * 12) % 360 : ctx.rng.int(0, 359);
    return rgbToHex(hslToRgb(hue, ctx.rng.int(45, 85), ctx.rng.int(35, 70)));
  });
}

function geo(ctx: RouteContext): Generated {
  if (ctx.variants[0] === "bbox") {
    const minLat = queryFloat(ctx.url.searchParams, "min_lat", -90, -90, 90);
    const maxLat = queryFloat(ctx.url.searchParams, "max_lat", 90, -90, 90);
    const minLng = queryFloat(ctx.url.searchParams, "min_lng", -180, -180, 180);
    const maxLng = queryFloat(ctx.url.searchParams, "max_lng", 180, -180, 180);
    return { lat: round(ctx.rng.number(Math.min(minLat, maxLat), Math.max(minLat, maxLat)), 6), lng: round(ctx.rng.number(Math.min(minLng, maxLng), Math.max(minLng, maxLng)), 6) };
  }
  return { lat: round(ctx.rng.number(-90, 90), 6), lng: round(ctx.rng.number(-180, 180), 6) };
}

function geohash(ctx: RouteContext): Generated {
  const point = geo(ctx) as { lat: number; lng: number };
  return encodeGeohash(point.lat, point.lng, argInt(ctx, 0, 8, 1, 32));
}

function encodeGeohash(lat: number, lng: number, precision: number): string {
  const alphabet = "0123456789bcdefghjkmnpqrstuvwxyz";
  let even = true;
  let bit = 0;
  let ch = 0;
  let geohashValue = "";
  let latRange: [number, number] = [-90, 90];
  let lngRange: [number, number] = [-180, 180];
  while (geohashValue.length < precision) {
    const rangeToUse = even ? lngRange : latRange;
    const mid = (rangeToUse[0] + rangeToUse[1]) / 2;
    if ((even ? lng : lat) > mid) {
      ch |= 1 << (4 - bit);
      rangeToUse[0] = mid;
    } else {
      rangeToUse[1] = mid;
    }
    even = !even;
    if (bit < 4) {
      bit += 1;
    } else {
      geohashValue += alphabet[ch];
      bit = 0;
      ch = 0;
    }
  }
  return geohashValue;
}

function country(ctx: RouteContext): Generated {
  const countryItem = pickCountry(ctx);
  return { code: countryItem.code, name: countryItem.name };
}

function city(ctx: RouteContext): Generated {
  return ctx.rng.pick(pickCountry(ctx).cities);
}

function address(ctx: RouteContext): Generated {
  return makeAddress(ctx, pickCountry(ctx));
}

function street(ctx: RouteContext): Generated {
  return `${ctx.rng.int(1, 9999)} ${ctx.rng.pick(STREET_NAMES)} ${ctx.rng.pick(["St", "Ave", "Rd", "Blvd", "Lane"])}`;
}

function makeAddress(ctx: RouteContext, countryItem: (typeof COUNTRIES)[number]): Record<string, string> {
  return {
    street: String(street(ctx)),
    city: ctx.rng.pick(countryItem.cities),
    postal_code: String(postalcode(ctx)),
    country: countryItem.name,
    country_code: countryItem.code
  };
}

function postalcode(ctx: RouteContext): Generated {
  const countryCode = ctx.url.searchParams.get("country")?.toUpperCase() ?? "US";
  if (countryCode === "GB") {
    return `${randomString(ctx.rng, 2, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")}${ctx.rng.int(1, 99)} ${ctx.rng.int(1, 9)}${randomString(ctx.rng, 2, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")}`;
  }
  if (countryCode === "CN") {
    return randomString(ctx.rng, 6, "0123456789");
  }
  return ctx.rng.int(10000, 99999).toString();
}

function timezone(ctx: RouteContext): Generated {
  return pickCountry(ctx).timezone;
}

function locale(ctx: RouteContext): Generated {
  return pickCountry(ctx).locale;
}

function currency(ctx: RouteContext): Generated {
  const countryItem = pickCountry(ctx);
  return { code: countryItem.currency, country: countryItem.code };
}

function language(ctx: RouteContext): Generated {
  const countryItem = pickCountry(ctx);
  return { language: countryItem.language, locale: countryItem.locale };
}

function date(ctx: RouteContext): Generated {
  const startYear = argInt(ctx, 0, 1970, 1, 9999);
  const endYear = argInt(ctx, 1, new Date().getUTCFullYear(), 1, 9999);
  const start = Date.UTC(Math.min(startYear, endYear), 0, 1);
  const end = Date.UTC(Math.max(startYear, endYear), 11, 31, 23, 59, 59);
  return new Date(ctx.rng.int(start, end)).toISOString().slice(0, 10);
}

function datetime(ctx: RouteContext): Generated {
  const start = Date.parse(ctx.args[0] ?? "2000-01-01");
  const end = Date.parse(ctx.args[1] ?? new Date().toISOString());
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    throw new HttpError(400, "datetime expects parseable start and end date values.");
  }
  return new Date(ctx.rng.int(Math.min(start, end), Math.max(start, end))).toISOString();
}

function timestamp(ctx: RouteContext): Generated {
  const ms = ctx.rng.int(Date.UTC(2000, 0, 1), Date.UTC(2035, 11, 31));
  return ctx.variants[0] === "milliseconds" ? ms : Math.floor(ms / 1000);
}

function duration(ctx: RouteContext): Generated {
  const min = queryInt(ctx.url.searchParams, "min_seconds", 60, 0, 31_536_000);
  const max = queryInt(ctx.url.searchParams, "max_seconds", 3600, 0, 31_536_000);
  const seconds = ctx.rng.int(Math.min(min, max), Math.max(min, max));
  return { seconds, iso8601: `PT${seconds}S` };
}

function relativeDate(ctx: RouteContext): Generated {
  const days = ctx.rng.int(-90, 90);
  const resolved = new Date(Date.now() + days * 86_400_000);
  return {
    phrase: days === 0 ? "today" : days > 0 ? `in ${days} days` : `${Math.abs(days)} days ago`,
    date: resolved.toISOString().slice(0, 10)
  };
}

function businessDay(ctx: RouteContext): Generated {
  let candidate: Date;
  do {
    candidate = randomFutureDate(ctx, 365);
  } while (candidate.getUTCDay() === 0 || candidate.getUTCDay() === 6);
  return candidate.toISOString().slice(0, 10);
}

function weekday(ctx: RouteContext): Generated {
  return ctx.rng.pick(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
}

function month(ctx: RouteContext): Generated {
  return ctx.rng.pick(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
}

function semver(ctx: RouteContext): Generated {
  const variant = ctx.variants[0] ?? "patch";
  const major = ctx.rng.int(0, 9);
  const minor = variant === "major" ? 0 : ctx.rng.int(0, 20);
  const patchValue = variant === "major" || variant === "minor" ? 0 : ctx.rng.int(0, 50);
  const suffix = variant === "prerelease" ? `-${ctx.rng.pick(["alpha", "beta", "rc"])}.${ctx.rng.int(1, 9)}` : "";
  return `${major}.${minor}.${patchValue}${suffix}`;
}

function slug(ctx: RouteContext): Generated {
  const count = queryInt(ctx.url.searchParams, "words", 3, 1, 12);
  return Array.from({ length: count }, () => ctx.rng.pick(WORDS)).join("-");
}

function base64(ctx: RouteContext): Generated {
  return encodeBytes(ctx.rng.bytes(argInt(ctx, 0, 32, 1, MAX_BYTES)), "base64");
}

function base32(ctx: RouteContext): Generated {
  return encodeBytes(ctx.rng.bytes(argInt(ctx, 0, 32, 1, MAX_BYTES)), "base32");
}

function hex(ctx: RouteContext): Generated {
  return encodeBytes(ctx.rng.bytes(argInt(ctx, 0, 32, 1, MAX_BYTES)), "hex");
}

function urlencoded(ctx: RouteContext): Generated {
  const params = new URLSearchParams();
  const keys = queryInt(ctx.url.searchParams, "keys", 3, 1, 50);
  for (let index = 0; index < keys; index += 1) {
    params.set(ctx.rng.pick(WORDS), ctx.rng.pick(WORDS));
  }
  return params.toString();
}

function regex(ctx: RouteContext): Generated {
  return ctx.rng.pick(["^[a-z0-9_-]{3,16}$", "^\\d{4}-\\d{2}-\\d{2}$", "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", "^(GET|POST|PUT|DELETE)\\s+/[\\w/-]+$"]);
}

function env(ctx: RouteContext): Generated {
  const keys = queryInt(ctx.url.searchParams, "keys", 3, 1, 100);
  return Array.from({ length: keys }, () => `${ctx.rng.pick(WORDS).toUpperCase()}_${ctx.rng.pick(WORDS).toUpperCase()}=${bytesToBase64Url(ctx.rng.bytes(12))}`).join("\n");
}

function git(ctx: RouteContext): Generated {
  if (ctx.variants[0] === "branch") {
    return `${ctx.rng.pick(["feature", "fix", "chore", "release"])}/${slug(ctx)}`;
  }
  return {
    hash: bytesToHex(ctx.rng.bytes(20)),
    short: bytesToHex(ctx.rng.bytes(4)),
    author: randomFullName(ctx),
    message: `${titleCase(ctx.rng.pick(["add", "fix", "update", "remove"]))} ${ctx.rng.pick(WORDS)} ${ctx.rng.pick(WORDS)}`,
    timestamp: randomPastDate(ctx, 30).toISOString()
  };
}

function file(ctx: RouteContext): Generated {
  const sizeKb = argInt(ctx, 0, 1, 1, Math.floor(MAX_FILE_BYTES / 1024));
  const bytes = ctx.rng.bytes(sizeKb * 1024, MAX_FILE_BYTES);
  return raw(bytesToArrayBuffer(bytes), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": String(bytes.byteLength),
      "Content-Disposition": `attachment; filename="random-${sizeKb}kb.bin"`
    }
  });
}

function csv(ctx: RouteContext): Generated {
  return tableText(ctx, ",", "text/csv; charset=utf-8");
}

function tsv(ctx: RouteContext): Generated {
  return tableText(ctx, "\t", "text/tab-separated-values; charset=utf-8");
}

function tableText(ctx: RouteContext, delimiter: string, contentType: string): Generated {
  const rows = queryInt(ctx.url.searchParams, "rows", 10, 0, MAX_ROWS);
  const columns = queryInt(ctx.url.searchParams, "columns", 4, 1, MAX_COLUMNS);
  const headersToUse = Array.from({ length: columns }, (_, index) => `column_${index + 1}`);
  const bodyRows = Array.from({ length: rows }, () => headersToUse.map(() => ctx.rng.pick(WORDS)).join(delimiter));
  return value([headersToUse.join(delimiter), ...bodyRows].join("\n"), { contentType });
}

function json(ctx: RouteContext): Generated {
  const depth = queryInt(ctx.url.searchParams, "depth", 3, 0, MAX_DEPTH);
  const keys = queryInt(ctx.url.searchParams, "keys", 3, 1, 25);
  return randomJsonValue(ctx, depth, keys);
}

function randomJsonValue(ctx: RouteContext, depth: number, keys: number): unknown {
  if (depth <= 0) {
    return ctx.rng.pick([ctx.rng.pick(WORDS), ctx.rng.int(0, 1000), ctx.rng.bool(), null]);
  }
  const output: Record<string, unknown> = {};
  for (let index = 0; index < keys; index += 1) {
    const key = `${ctx.rng.pick(WORDS)}_${index + 1}`;
    output[key] = ctx.rng.bool(0.35) ? randomJsonValue(ctx, depth - 1, Math.max(1, Math.floor(keys / 2))) : randomJsonValue(ctx, 0, keys);
  }
  return output;
}

function xml(ctx: RouteContext): Generated {
  const nodes = queryInt(ctx.url.searchParams, "nodes", 5, 1, 200);
  const body = Array.from({ length: nodes }, (_, index) => `  <item id="${index + 1}">${escapeHtml(ctx.rng.pick(WORDS))}</item>`).join("\n");
  return value(`<?xml version="1.0" encoding="UTF-8"?>\n<random>\n${body}\n</random>`, { contentType: "application/xml; charset=utf-8" });
}

function yaml(ctx: RouteContext): Generated {
  const keys = queryInt(ctx.url.searchParams, "keys", 5, 1, 100);
  return value(Array.from({ length: keys }, () => `${ctx.rng.pick(WORDS)}: ${ctx.rng.pick(WORDS)}`).join("\n"), { contentType: "text/yaml; charset=utf-8" });
}

function svg(ctx: RouteContext): Generated {
  const width = argInt(ctx, 0, 400, 1, 4000);
  const height = argInt(ctx, 1, 300, 1, 4000);
  const bg = String(color({ ...ctx, variants: ["light"] }));
  const fg = String(color({ ...ctx, variants: ["dark"] }));
  const label = `${width} x ${height}`;
  return value(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Random placeholder ${label}"><rect width="100%" height="100%" fill="${bg}"/><circle cx="${ctx.rng.int(0, width)}" cy="${ctx.rng.int(0, height)}" r="${Math.max(8, Math.min(width, height) / 5)}" fill="${fg}" opacity="0.22"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${Math.max(12, Math.floor(Math.min(width, height) / 10))}" fill="${fg}">${label}</text></svg>`, {
    contentType: "image/svg+xml; charset=utf-8"
  });
}

function avatar(ctx: RouteContext): Generated {
  const size = argInt(ctx, 0, 200, 32, 1000);
  const cells = 5;
  const cell = size / cells;
  const background = String(color({ ...ctx, variants: ["light"] }));
  const foreground = String(color({ ...ctx, variants: ["dark"] }));
  const rects: string[] = [];
  for (let y = 0; y < cells; y += 1) {
    for (let x = 0; x < Math.ceil(cells / 2); x += 1) {
      if (ctx.rng.bool(0.5)) {
        rects.push(`<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`);
        const mirror = cells - x - 1;
        if (mirror !== x) {
          rects.push(`<rect x="${mirror * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`);
        }
      }
    }
  }
  return value(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="100%" height="100%" fill="${background}"/><g fill="${foreground}">${rects.join("")}</g></svg>`, {
    contentType: "image/svg+xml; charset=utf-8"
  });
}

function edgecase(ctx: RouteContext): Generated {
  const category = ctx.variants[0] ?? "string";
  const mode = ctx.variants[1] ?? "mixed";
  if (category === "number") {
    return ctx.rng.pick([0, -1, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.EPSILON, Infinity, -Infinity, NaN]);
  }
  if (category === "json") {
    if (mode === "deep") {
      let current: Record<string, unknown> = { value: "leaf" };
      for (let index = 0; index < 20; index += 1) {
        current = { nested: current };
      }
      return current;
    }
    if (mode === "wide") {
      return Object.fromEntries(Array.from({ length: 200 }, (_, index) => [`key_${index}`, index]));
    }
    return { text: "unicode cafe resume", array: [null, true, 0, "", { nested: true }] };
  }
  const cases: Record<string, string> = {
    empty: "",
    long: "x".repeat(4096),
    unicode: "cafe resume jalapeno",
    emoji: "test :)",
    rtl: "abc \u202E txt",
    html: "<div data-test=\"value\">content</div>",
    newline: "line one\nline two\r\nline three",
    whitespace: " \t\n  "
  };
  return cases[mode] ?? ctx.rng.pick(Object.values(cases));
}

function invalid(ctx: RouteContext): Generated {
  const type = ctx.variants[0] ?? "email";
  if (type === "url") {
    return ctx.rng.pick(["http://", "://missing-scheme", "https://exa mple.com", "not a url"]);
  }
  return ctx.rng.pick(["plainaddress", "@missing-local.test", "missing-domain@", "two@@example.com"]);
}

function fuzz(ctx: RouteContext): Generated {
  const type = ctx.variants[0] ?? "string";
  if (type === "binary") {
    const bytes = ctx.rng.bytes(argInt(ctx, 0, 512, 0, MAX_BYTES));
    return raw(bytesToArrayBuffer(bytes), { headers: { "Content-Type": "application/octet-stream", "Content-Length": String(bytes.byteLength) } });
  }
  if (type === "json") {
    return randomJsonValue(ctx, queryInt(ctx.url.searchParams, "depth", 3, 0, MAX_DEPTH), queryInt(ctx.url.searchParams, "keys", 5, 1, 50));
  }
  const length = ctx.rng.int(0, queryInt(ctx.url.searchParams, "max_length", 256, 0, 8192));
  return randomString(ctx.rng, length, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !@#$%^&*()_+-=[]{};:,.<>/?\\|");
}

function payload(ctx: RouteContext): Generated {
  const type = ctx.variants[0] ?? "xss";
  const payloads: Record<string, string[]> = {
    xss: ["&lt;script&gt;alert(1)&lt;/script&gt;", "\"><img src=x data-test=escaped>", "javascript:alert%281%29"],
    sql: ["' OR '1'='1", "\"; DROP TABLE test; --", "admin'--"],
    path: ["../etc/passwd", "..\\..\\windows\\win.ini", "%2e%2e%2fsecret"],
    command: ["; echo test", "&& whoami", "$(id)"]
  };
  return ctx.rng.pick(payloads[type] ?? payloads.xss);
}

function log(ctx: RouteContext): Generated {
  const variant = ctx.variants[0] ?? "info";
  if (variant === "nginx") {
    return `${ip({ ...ctx, variants: ["v4"] })} - - [${new Date().toUTCString()}] "GET /api/random HTTP/1.1" 200 ${ctx.rng.int(128, 16384)} "-" "${useragent(ctx)}"`;
  }
  if (variant === "apache") {
    return `${ip({ ...ctx, variants: ["v4"] })} - user [${new Date().toUTCString()}] "POST /login HTTP/1.1" 302 ${ctx.rng.int(128, 16384)}`;
  }
  return {
    timestamp: new Date().toISOString(),
    level: variant,
    service: `${ctx.rng.pick(WORDS)}-service`,
    message: `${titleCase(ctx.rng.pick(WORDS))} event processed`,
    request_id: uuidV4(ctx.rng)
  };
}

function metric(ctx: RouteContext): Generated {
  return {
    name: `${ctx.rng.pick(WORDS)}.${ctx.rng.pick(["latency", "count", "error_rate", "memory"])}`,
    value: round(ctx.rng.number(0, 1000), 3),
    unit: ctx.rng.pick(["ms", "count", "percent", "bytes"]),
    tags: { service: `${ctx.rng.pick(WORDS)}-api`, region: ctx.rng.pick(["iad", "sfo", "fra", "nrt"]) },
    timestamp: new Date().toISOString()
  };
}

function trace(ctx: RouteContext): Generated {
  const id = String(traceid(ctx));
  const spans = Array.from({ length: ctx.rng.int(2, 6) }, () => span(ctx));
  return { trace_id: id, spans };
}

function span(ctx: RouteContext): Generated {
  return {
    trace_id: traceid(ctx),
    span_id: spanid(ctx),
    parent_span_id: ctx.rng.bool(0.6) ? spanid(ctx) : null,
    name: `${ctx.rng.pick(["GET", "POST", "QUERY", "CACHE"])} ${ctx.rng.pick(WORDS)}`,
    duration_ms: round(ctx.rng.number(1, 1000), 2)
  };
}

function alert(ctx: RouteContext): Generated {
  return {
    id: uuidV4(ctx.rng),
    severity: ctx.rng.pick(["info", "warning", "critical"]),
    service: `${ctx.rng.pick(WORDS)}-service`,
    title: `${titleCase(ctx.rng.pick(WORDS))} threshold exceeded`,
    status: ctx.rng.pick(["open", "acknowledged", "resolved"])
  };
}

function apiResponse(ctx: RouteContext): Generated {
  const ok = ctx.rng.bool(0.85);
  return {
    ok,
    status: ok ? 200 : ctx.rng.pick([400, 401, 404, 500]),
    request_id: uuidV4(ctx.rng),
    data: ok ? randomJsonValue(ctx, 2, 3) : null,
    error: ok ? null : { code: "mock_error", message: "Generated API error" }
  };
}

function graphql(ctx: RouteContext): Generated {
  const variant = ctx.variants[0] ?? "response";
  if (variant === "query") {
    return "query RandomUser($id: ID!) { user(id: $id) { id name email } }";
  }
  if (variant === "error") {
    return { errors: [{ message: "Generated GraphQL error", path: ["user", "email"] }], data: { user: null } };
  }
  return { data: { user: user(ctx) } };
}

function table(ctx: RouteContext): Generated {
  const rows = queryInt(ctx.url.searchParams, "rows", 10, 0, MAX_ROWS);
  const columnSpec = splitCsv(ctx.url.searchParams.get("columns"), ["name", "email", "age:num"]);
  const columns = columnSpec.slice(0, MAX_COLUMNS);
  return Array.from({ length: rows }, () =>
    Object.fromEntries(
      columns.map((column) => {
        const [key, type = "word"] = column.split(":");
        return [key, valueForType(ctx, type)];
      })
    )
  );
}

function schema(ctx: RouteContext): Generated {
  const schemaBody = normalizeSchemaBody(ctx.body);
  return generateFromSchema(ctx, schemaBody);
}

function mock(ctx: RouteContext): Generated {
  const template = ctx.body === undefined ? { id: "{{uuid}}", name: "{{name}}", email: "{{email}}" } : ctx.body;
  return fillTemplate(ctx, template);
}

function scenario(ctx: RouteContext): Generated {
  const type = ctx.variants[0] ?? "ecommerce";
  if (type === "auth") {
    const users = queryInt(ctx.url.searchParams, "users", 5, 1, 100);
    return {
      users: Array.from({ length: users }, () => user(ctx)),
      sessions: Array.from({ length: users }, () => ({ id: secureNamedToken({ ...ctx, resource: "sessionid" }), user_id: uuidV4(ctx.rng), expires_at: randomFutureDate(ctx, 7).toISOString() })),
      audit_events: Array.from({ length: users * 2 }, () => log({ ...ctx, variants: ["info"] }))
    };
  }
  if (type === "analytics") {
    const events = queryInt(ctx.url.searchParams, "events", 100, 1, 1000);
    return Array.from({ length: events }, () => ({
      event_id: uuidV4(ctx.rng),
      user_id: uuidV4(ctx.rng),
      event: ctx.rng.pick(["page_view", "signup", "purchase", "click"]),
      timestamp: randomPastDate(ctx, 30).toISOString(),
      properties: randomJsonValue(ctx, 1, 3)
    }));
  }
  if (type === "observability") {
    const events = queryInt(ctx.url.searchParams, "events", 50, 1, 1000);
    return {
      services: Array.from({ length: queryInt(ctx.url.searchParams, "services", 3, 1, 50) }, () => `${ctx.rng.pick(WORDS)}-service`),
      logs: Array.from({ length: events }, () => log(ctx)),
      metrics: Array.from({ length: Math.min(events, 100) }, () => metric(ctx)),
      traces: Array.from({ length: Math.min(events, 25) }, () => trace(ctx)),
      alerts: Array.from({ length: ctx.rng.int(1, 5) }, () => alert(ctx))
    };
  }
  const users = Array.from({ length: queryInt(ctx.url.searchParams, "users", 5, 1, 100) }, () => user(ctx));
  const products = Array.from({ length: queryInt(ctx.url.searchParams, "products", 10, 1, 100) }, () => product(ctx));
  const orders = Array.from({ length: queryInt(ctx.url.searchParams, "orders", 10, 1, 1000) }, () => order(ctx));
  return { users, products, orders, invoices: orders.slice(0, 20).map(() => invoice(ctx)) };
}

function normalizeSchemaBody(body: unknown): unknown {
  if (body && typeof body === "object" && "fields" in body && typeof (body as { fields: unknown }).fields === "object") {
    return (body as { fields: unknown }).fields;
  }
  if (body && typeof body === "object") {
    return body;
  }
  return { id: "uuid", name: "name", email: "email", active: "bool" };
}

function generateFromSchema(ctx: RouteContext, schemaBody: unknown): unknown {
  if (Array.isArray(schemaBody)) {
    return schemaBody.map((item) => generateFromSchema(ctx, item));
  }
  if (schemaBody && typeof schemaBody === "object") {
    return Object.fromEntries(Object.entries(schemaBody).map(([key, spec]) => [key, generateFromSchema(ctx, spec)]));
  }
  if (typeof schemaBody === "string") {
    return valueForType(ctx, schemaBody);
  }
  return schemaBody;
}

function fillTemplate(ctx: RouteContext, template: unknown): unknown {
  if (Array.isArray(template)) {
    return template.map((item) => fillTemplate(ctx, item));
  }
  if (template && typeof template === "object") {
    return Object.fromEntries(Object.entries(template).map(([key, item]) => [key, fillTemplate(ctx, item)]));
  }
  if (typeof template === "string") {
    return template.replace(/\{\{\s*([a-z0-9:_-]+)\s*\}\}/giu, (_, type: string) => String(valueForType(ctx, type)));
  }
  return template;
}

function valueForType(ctx: RouteContext, typeSpec: string): unknown {
  const [type, variant] = typeSpec.toLowerCase().split(":");
  const local = { ...ctx, variants: variant ? [variant] : [] };
  switch (type) {
    case "uuid":
      return uuid(local);
    case "name":
      return name(local);
    case "email":
      return email(local);
    case "username":
      return username(local);
    case "phone":
      return phone(local);
    case "num":
    case "number":
    case "int":
      return ctx.rng.int(0, 100);
    case "float":
      return round(ctx.rng.number(0, 1), 6);
    case "bool":
    case "boolean":
      return ctx.rng.bool();
    case "date":
      return date({ ...ctx, args: ["2020", "2030"] });
    case "datetime":
      return datetime({ ...ctx, args: ["2020-01-01", "2030-12-31"] });
    case "word":
    case "string":
    default:
      return ctx.rng.pick(WORDS);
  }
}

function textBytes(input: string): Uint8Array {
  return new TextEncoder().encode(input);
}

function escapeHtml(input: string): string {
  return input.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function titleCase(input: string): string {
  return input.replace(/\b[a-z]/gu, (match) => match.toUpperCase());
}

function randomPastDate(ctx: RouteContext, daysBack: number): Date {
  return new Date(Date.now() - ctx.rng.int(0, daysBack * 86_400_000));
}

function randomFutureDate(ctx: RouteContext, daysForward: number): Date {
  return new Date(Date.now() + ctx.rng.int(0, daysForward * 86_400_000));
}
