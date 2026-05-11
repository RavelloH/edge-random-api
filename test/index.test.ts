import { describe, expect, it } from "vitest";
import worker from "../src/index";

const env = {};
const executionContext = {} as ExecutionContext;

async function fetchWorker(path: string, init?: RequestInit): Promise<Response> {
  return worker.fetch(new Request(`https://worker.test${path}`, init), env, executionContext);
}

describe("edge random api worker", () => {
  it("serves the root API description with host-derived base_url and GitHub metadata", async () => {
    const response = await worker.fetch(
      new Request("https://fallback.test/", {
        headers: {
          host: "random.example.test",
          "x-forwarded-proto": "https"
        }
      }),
      env,
      executionContext
    );

    expect(response.status).toBe(200);
    const body = (await response.json()) as { base_url: string; github: { repository: string; url: string } };
    expect(body.base_url).toBe("https://random.example.test");
    expect(body.github.repository).toBe("RavelloH/edge-random-api");
    expect(body.github.url).toBe("https://github.com/RavelloH/edge-random-api");
  });

  it("wraps generated values and supports count", async () => {
    const response = await fetchWorker("/uuid?count=3&format=json");
    const body = (await response.json()) as { status: number; meta: { type: string; count: number; latency_ms: number }; data: string[] };

    expect(response.status).toBe(200);
    expect(body.status).toBe(200);
    expect(body.meta.type).toBe("uuid");
    expect(body.meta.count).toBe(3);
    expect(body.meta.latency_ms).toBeGreaterThan(0);
    expect(body.data).toHaveLength(3);
    expect(body.data[0]).toMatch(/^[0-9a-f-]{36}$/u);
  });

  it("is deterministic for the same seed and request", async () => {
    const first = await (await fetchWorker("/str:hex/32?seed=repeatable")).text();
    const second = await (await fetchWorker("/str:hex/32?seed=repeatable")).text();

    expect(second).toBe(first);
  });

  it("defaults to text format for data endpoints", async () => {
    const response = await fetchWorker("/pin/6?seed=pin");
    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(await response.text()).toMatch(/^\d{6}$/u);
  });

  it("generates schema-driven objects from POST JSON", async () => {
    const response = await fetchWorker("/schema?seed=schema&format=json", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ fields: { id: "uuid", email: "email", active: "bool", score: "num" } })
    });
    const body = (await response.json()) as { data: { id: string; email: string; active: boolean; score: number } };

    expect(response.status).toBe(200);
    expect(body.data.id).toMatch(/^[0-9a-f-]{36}$/u);
    expect(body.data.email).toContain("@");
    expect(typeof body.data.active).toBe("boolean");
    expect(typeof body.data.score).toBe("number");
  });

  it("returns raw binary for file endpoints", async () => {
    const response = await fetchWorker("/file/1?seed=file");
    const bytes = await response.arrayBuffer();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/octet-stream");
    expect(bytes.byteLength).toBe(1024);
  });

  it("returns real unicode and emoji edge-case strings", async () => {
    const unicode = (await (await fetchWorker("/edgecase:string+unicode?format=json")).json()) as { data: string };
    const emoji = (await (await fetchWorker("/edgecase:string+emoji?format=json")).json()) as { data: string };

    expect(unicode.data).toContain("\u4E16\u754C");
    expect(unicode.data).toContain("\u0645\u0631\u062D\u0628\u0627");
    expect(emoji.data).toContain("\uD83D\uDE00");
    expect(emoji.data).toContain("\uD83D\uDE80");
  });

  it("marks faker-backed endpoints with source metadata", async () => {
    const response = await fetchWorker("/person?format=json&seed=faker-source");
    const body = (await response.json()) as { meta: { source: string; source_methods: string[] }; data: { name: string; email: string } };

    expect(body.meta.source).toBe("@faker-js/faker@10.4.0");
    expect(body.meta.source_methods).toContain("faker.person.fullName");
    expect(body.data.name).toBeTruthy();
    expect(body.data.email).toContain("@");
  });

  it("smoke-tests representative endpoints across the API surface", async () => {
    const paths = [
      "/entropy:hex/8",
      "/randomness:test?bytes=64",
      "/num/1/10",
      "/float/0/1",
      "/decimal/1/2",
      "/password/12",
      "/passphrase/3",
      "/token:hex/8",
      "/hash:sha256",
      "/sshkey:ed25519",
      "/jwt",
      "/uuid:v7",
      "/ulid",
      "/nanoid/10",
      "/objectid",
      "/ksuid",
      "/xid",
      "/snowflake",
      "/traceid",
      "/spanid",
      "/prime/100/200",
      "/gaussian/0/1",
      "/poisson/3",
      "/weighted-pick?items=a,b&weights=1,2",
      "/matrix/2/2",
      "/lorem:para/1",
      "/markdown",
      "/animal:dog",
      "/book",
      "/food",
      "/name:female",
      "/person",
      "/product",
      "/creditcard:visa",
      "/order",
      "/vehicle",
      "/ip:v6",
      "/cookies:response",
      "/status/4xx",
      "/color:cmyk",
      "/palette:analogous/3",
      "/geo:bbox?min_lat=30&min_lng=-120&max_lat=40&max_lng=-110",
      "/address",
      "/date/2020/2026",
      "/timestamp:milliseconds",
      "/business-day",
      "/semver:prerelease",
      "/git:commit",
      "/hacker",
      "/music",
      "/chemical-element",
      "/database",
      "/airline",
      "/airport",
      "/flight",
      "/csv?rows=2&columns=2",
      "/svg/100/80",
      "/edgecase:json+deep",
      "/invalid:url",
      "/fuzz:json?depth=2&keys=2",
      "/payload:sql",
      "/log:error",
      "/metric",
      "/trace",
      "/api-response",
      "/graphql:response",
      "/table?rows=2&columns=name,email,age:num",
      "/scenario:ecommerce?users=2&products=2&orders=2"
    ];

    for (const path of paths) {
      const separator = path.includes("?") ? "&" : "?";
      const response = await fetchWorker(`${path}${separator}seed=smoke&format=json`);
      const body = (await response.json()) as { status: number; data: unknown };
      expect(response.status, path).toBe(200);
      expect(body.status, path).toBe(200);
      expect(body.data, path).not.toBeUndefined();
    }
  });
});
