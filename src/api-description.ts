export const API_DESCRIPTION = {
  api: "Random Generator API",
  version: "1.4.0-draft",
  base_url: "https://random.ravelloh.com",
  github: {
    repository: "RavelloH/edge-random-api",
    url: "https://github.com/RavelloH/edge-random-api"
  },
  description:
    "A Cloudflare Worker friendly random data generator. Default generation uses Web Crypto API CSPRNG. Seeded requests use deterministic PRNG for reproducible output.",
  randomness_model: {
    default_source: "web_crypto_csprng",
    default_security: "cryptographically_secure",
    true_random: false,
    seeded_source: "deterministic_prng",
    notes: [
      "Web Crypto provides cryptographically secure randomness suitable for security-sensitive engineering use, but it is not a physical true random number generator.",
      "When seed is provided, generation becomes deterministic and should not be treated as cryptographically secure."
    ]
  },
  routing_conventions: {
    default_endpoint: "/:resource",
    variant_endpoint: "/:resource:variant",
    combined_variants: "/:resource:variantA+variantB",
    numeric_or_range_args: "/:resource/:length_or_min/:max?",
    open_filters:
      "Use query parameters for open-ended filters such as country, locale, currency, domain, min, max, rows, columns.",
    examples: [
      "/uuid",
      "/uuid:v7",
      "/str:hex/16/32",
      "/crypto:base64url/32",
      "/hash:sha256",
      "/ip:v6",
      "/name:female?locale=en-US",
      "/money?currency=USD&min=10&max=500"
    ]
  },
  global_parameters: {
    count: {
      type: "integer",
      description: "Number of results to return. Default is 1.",
      max_limit: 100,
      example: "?count=5"
    },
    format: {
      type: "string",
      description: "Response format. Default is json. Text endpoints can use format=text.",
      options: ["json", "text"]
    },
    seed: {
      type: "string",
      description:
        "Optional seed for deterministic reproducible output. Seeded generation bypasses Web Crypto for that request.",
      example: "?seed=my_unique_project_seed"
    }
  },
  standard_response_format: {
    status: 200,
    meta: {
      type: "string",
      count: "integer",
      timestamp: "ISO 8601 date string",
      latency_ms: "float",
      randomness: {
        source: "web_crypto_csprng | deterministic_prng",
        seeded: "boolean",
        security: "cryptographically_secure | deterministic"
      }
    },
    data: "single value when count=1, array when count>1"
  },
  endpoints: {
    randomness_and_entropy: [
      {
        path: "/entropy/:bytes",
        description: "Return raw random bytes plus metadata about the randomness source.",
        variants: ["/entropy:hex/:bytes", "/entropy:base64/:bytes", "/entropy:base64url/:bytes"],
        example: "/entropy:hex/32"
      },
      {
        path: "/randomness",
        description: "Return runtime randomness metadata such as source, seeded state, and security classification.",
        example: "/randomness"
      },
      {
        path: "/randomness:test",
        description:
          "Generate a sample and return lightweight frequency, duplicate, and byte distribution statistics.",
        parameters: { bytes: "Sample size in bytes. Default 1024, capped for Worker CPU safety." },
        example: "/randomness:test?bytes=4096"
      }
    ],
    core_types: [
      { path: "/num/:exact_or_min/:max?", description: "Generate a random integer.", example: "/num/10/50" },
      { path: "/float/:exact_or_min/:max?", description: "Generate a random floating-point number.", example: "/float/0/1" },
      {
        path: "/decimal/:exact_or_min/:max?",
        description: "Generate a decimal string with configurable precision.",
        parameters: { precision: "Number of digits after the decimal point. Default 2." },
        example: "/decimal/10/99?precision=4"
      },
      {
        path: "/str(:charset)?/:exact_or_min/:max?",
        description: "Generate a random string. Charsets can be combined with '+'. Default is alpha+num.",
        charsets: ["alpha", "lower", "upper", "num", "alnum", "hex", "symbol", "base32", "base58", "base64", "base64url"],
        examples: ["/str/32", "/str:hex/16/32", "/str:alpha+num/24"]
      },
      { path: "/bool/:probability?", description: "Generate a random boolean. Optional probability controls chance of true.", example: "/bool/0.8" },
      { path: "/null", description: "Return null, useful for random schema and edge-case tests.", example: "/null" }
    ],
    security_credentials: [
      { path: "/password/:length", description: "Generate a high-entropy password with uppercase, lowercase, number, and symbol coverage.", example: "/password/16" },
      { path: "/passphrase/:words", description: "Generate a memorable passphrase from a built-in word list.", parameters: { separator: "Separator between words. Default '-'." }, example: "/passphrase/5?separator=-" },
      { path: "/pin/:length", description: "Generate a numeric PIN padded with leading zeros.", example: "/pin/6" },
      { path: "/otp/:length?", description: "Generate a numeric one-time code. Default length is 6.", example: "/otp/6" },
      { path: "/token/:bytes", description: "Generate a secure token.", variants: ["/token:hex/:bytes", "/token:base64/:bytes", "/token:base64url/:bytes"], example: "/token:base64url/32" },
      { path: "/apikey", description: "Generate an API-key-shaped secure token.", parameters: { prefix: "Optional key prefix." }, example: "/apikey?prefix=rnd" },
      { path: "/secret/:bytes?", description: "Generate an application secret. Default is 32 random bytes encoded as base64url.", example: "/secret/32" },
      { path: "/nonce/:bytes?", description: "Generate a nonce for tests and protocol mockups.", example: "/nonce/16" },
      { path: "/csrf/:bytes?", description: "Generate a CSRF-token-shaped random value.", example: "/csrf/32" },
      { path: "/sessionid/:bytes?", description: "Generate a session-id-shaped random value.", example: "/sessionid/32" },
      { path: "/recovery-codes/:count?", description: "Generate account recovery codes.", parameters: { length: "Characters per code. Default 10." }, example: "/recovery-codes/8?length=10" },
      { path: "/crypto(:encoding)?/:bytes", description: "Generate raw cryptographically secure bytes in the selected encoding.", encodings: ["base64", "hex", "base64url"], example: "/crypto:hex/32" },
      { path: "/hash:algorithm", description: "Generate a random hash string by hashing random data. Useful for mock checksums.", algorithms: ["sha256", "sha512", "md5", "sha1"], example: "/hash:sha256" },
      { path: "/sshkey:type", description: "Generate a mock SSH public key string for UI tests. Not a real usable key pair.", types: ["rsa", "ed25519"], example: "/sshkey:ed25519" },
      { path: "/jwt", description: "Generate a mock JWT-shaped token for UI and parser tests. Signature is not trusted.", variants: ["/jwt:hs256", "/jwt:rs256", "/jwt:none"], example: "/jwt:hs256" }
    ],
    identifiers: [
      { path: "/uuid", description: "Generate a UUID. Default variant is v4 unless changed by API policy.", variants: ["/uuid:v4", "/uuid:v7"], example: "/uuid:v7" },
      { path: "/ulid", description: "Generate a Universally Unique Lexicographically Sortable Identifier.", example: "/ulid" },
      { path: "/nanoid/:length?", description: "Generate a URL-friendly NanoID.", example: "/nanoid/21" },
      { path: "/cuid2", description: "Generate a collision-resistant Cuid2-like identifier.", example: "/cuid2" },
      { path: "/objectid", description: "Generate a MongoDB ObjectId-shaped 24-character hex string.", example: "/objectid" },
      { path: "/ksuid", description: "Generate a KSUID-shaped sortable identifier.", example: "/ksuid" },
      { path: "/xid", description: "Generate an XID-shaped compact sortable identifier.", example: "/xid" },
      { path: "/snowflake", description: "Generate a Snowflake-like numeric identifier.", parameters: { epoch: "Optional custom epoch timestamp." }, example: "/snowflake" },
      { path: "/traceid", description: "Generate a W3C trace id.", example: "/traceid" },
      { path: "/spanid", description: "Generate a W3C span id.", example: "/spanid" }
    ],
    advanced_math: [
      { path: "/prime/:exact_or_min/:max?", description: "Generate a random prime number within a range.", example: "/prime/100/1000" },
      { path: "/gaussian/:mean/:std", description: "Generate a normally distributed random number.", example: "/gaussian/50/15" },
      { path: "/poisson/:lambda", description: "Generate a random number from a Poisson distribution.", example: "/poisson/5" },
      { path: "/bernoulli/:probability", description: "Generate 1 or 0 from a Bernoulli trial.", example: "/bernoulli/0.75" },
      { path: "/uniform/:min/:max", description: "Generate a random number from a uniform distribution.", example: "/uniform/0/100" },
      { path: "/exponential/:lambda", description: "Generate a random number from an exponential distribution.", example: "/exponential/1.5" },
      { path: "/weighted-pick", description: "Pick an item from a weighted list.", parameters: { items: "Comma-separated items.", weights: "Comma-separated numeric weights." }, example: "/weighted-pick?items=red,green,blue&weights=1,3,2" },
      { path: "/sample", description: "Select a random subset from a list without replacement.", parameters: { items: "Comma-separated items.", size: "Sample size." }, example: "/sample?items=a,b,c,d,e&size=3" },
      { path: "/shuffle", description: "Shuffle provided items using Fisher-Yates.", parameters: { items: "Comma-separated items." }, example: "/shuffle?items=1,2,3,4,5" },
      { path: "/range/:min/:max", description: "Generate a numeric range or random subset from a range.", parameters: { step: "Step size. Default 1.", size: "Optional number of random values." }, example: "/range/1/100?size=10" },
      { path: "/vector/:length", description: "Generate a vector of random numbers.", example: "/vector/10?min=-1&max=1" },
      { path: "/matrix/:rows/:columns", description: "Generate a matrix of random numbers.", example: "/matrix/3/4?min=0&max=100" }
    ],
    mock_text_and_identity: [
      { path: "/lorem:type/:amount", description: "Generate Lorem Ipsum placeholder text.", types: ["word", "sentence", "para", "html"], example: "/lorem:para/3" },
      { path: "/words/:count", description: "Generate random words from a built-in small word list.", example: "/words/10" },
      { path: "/sentence/:count?", description: "Generate one or more random sentences.", example: "/sentence/3" },
      { path: "/paragraph/:count?", description: "Generate one or more random paragraphs.", example: "/paragraph/2" },
      { path: "/markdown", description: "Generate random markdown containing headers, lists, tables, and code blocks.", example: "/markdown" },
      { path: "/quote", description: "Return a placeholder quote from a built-in list.", example: "/quote" },
      { path: "/name", description: "Generate a mock full name.", variants: ["/name:male", "/name:female", "/name:any"], parameters: { locale: "Optional locale hint." }, example: "/name:female?locale=en-US" },
      { path: "/username", description: "Generate a random username.", example: "/username" },
      { path: "/email", description: "Generate a valid-looking mock email address.", parameters: { domain: "Optional email domain." }, example: "/email?domain=gmail.com" },
      { path: "/phone", description: "Generate a valid-looking mock phone number.", parameters: { country: "Optional country code." }, example: "/phone?country=US" },
      { path: "/bio", description: "Generate a short mock personal biography.", example: "/bio" }
    ],
    business_and_commerce: [
      { path: "/person", description: "Generate a complete mock person profile.", example: "/person?locale=en-US" },
      { path: "/user", description: "Generate a complete mock user object.", example: "/user?count=10" },
      { path: "/company", description: "Generate a mock company profile.", example: "/company" },
      { path: "/job", description: "Generate a mock job title, department, and seniority.", example: "/job" },
      { path: "/product", description: "Generate a mock product record.", example: "/product" },
      { path: "/price", description: "Generate a random product price.", parameters: { min: "Minimum amount.", max: "Maximum amount.", currency: "Optional ISO 4217 currency." }, example: "/price?min=10&max=500&currency=USD" },
      { path: "/money", description: "Generate a random monetary amount.", parameters: { currency: "Optional ISO 4217 currency.", min: "Minimum amount.", max: "Maximum amount." }, example: "/money?currency=USD" },
      { path: "/creditcard", description: "Generate a mock payment card number for UI and validation tests. Never returns a real usable card.", variants: ["/creditcard:visa", "/creditcard:mastercard", "/creditcard:amex", "/creditcard:discover"], example: "/creditcard:visa" },
      { path: "/iban", description: "Generate a mock IBAN-like value.", parameters: { country: "Optional country code." }, example: "/iban?country=DE" },
      { path: "/orderid", description: "Generate a random order identifier.", example: "/orderid" },
      { path: "/order", description: "Generate a mock order object.", example: "/order" },
      { path: "/invoice", description: "Generate a mock invoice object.", example: "/invoice" },
      { path: "/sku", description: "Generate a random SKU.", example: "/sku" },
      { path: "/barcode:type", description: "Generate a barcode value string only. Does not render barcode images.", types: ["ean13", "upc", "code128"], example: "/barcode:ean13" }
    ],
    network_and_system: [
      { path: "/ip:type", description: "Generate a random IP address.", types: ["v4", "v6"], example: "/ip:v4" },
      { path: "/mac", description: "Generate a random MAC address.", variants: ["/mac:colon", "/mac:dash", "/mac:none"], example: "/mac:dash" },
      { path: "/port", description: "Generate a random unprivileged port from 1024 to 65535.", example: "/port" },
      { path: "/useragent", description: "Generate a browser User-Agent string.", variants: ["/useragent:desktop", "/useragent:mobile", "/useragent:tablet"], example: "/useragent:mobile" },
      { path: "/domain", description: "Generate a mock domain name.", example: "/domain" },
      { path: "/url", description: "Generate a mock URL.", example: "/url" },
      { path: "/mime", description: "Generate a valid MIME type.", example: "/mime" },
      { path: "/cron", description: "Generate a valid Cron expression.", example: "/cron" },
      { path: "/headers", description: "Generate mock HTTP headers.", example: "/headers" },
      { path: "/cookies", description: "Generate mock HTTP Cookie or Set-Cookie values.", variants: ["/cookies:request", "/cookies:response"], example: "/cookies:response" },
      { path: "/status/:code_or_class", description: "Return a specific HTTP status code or random code from a class.", example: "/status/5xx" },
      { path: "/redirect/:count?", description: "Return a lightweight redirect chain for client behavior tests.", example: "/redirect/3" },
      { path: "/delay/:max_ms", description: "Pause for a random duration between 0 and max_ms.", example: "/delay/2000" }
    ],
    geo_and_localization: [
      { path: "/color", description: "Generate a random color.", variants: ["/color:hex", "/color:rgb", "/color:hsl", "/color:dark", "/color:light", "/color:cmyk"], example: "/color:dark" },
      { path: "/palette/:count?", description: "Generate a lightweight random color palette.", variants: ["/palette:random", "/palette:analogous", "/palette:complementary"], example: "/palette:complementary/5" },
      { path: "/geo", description: "Generate random latitude and longitude.", example: "/geo" },
      { path: "/geo:bbox", description: "Generate coordinates inside a bounding box.", parameters: { min_lat: "Minimum latitude.", min_lng: "Minimum longitude.", max_lat: "Maximum latitude.", max_lng: "Maximum longitude." }, example: "/geo:bbox?min_lat=30&min_lng=-120&max_lat=40&max_lng=-110" },
      { path: "/geohash/:length?", description: "Generate a geohash string.", example: "/geohash/8" },
      { path: "/country", description: "Generate a random country with ISO code.", example: "/country" },
      { path: "/city", description: "Generate a random city name.", parameters: { country: "Optional country code." }, example: "/city?country=US" },
      { path: "/address", description: "Generate a mock postal address.", parameters: { country: "Optional country code.", locale: "Optional locale hint." }, example: "/address?country=US" },
      { path: "/street", description: "Generate a random street address line.", example: "/street?country=US" },
      { path: "/postalcode", description: "Generate a postal or ZIP code.", example: "/postalcode?country=US" },
      { path: "/timezone", description: "Return a random IANA timezone.", parameters: { country: "Optional country code." }, example: "/timezone?country=US" },
      { path: "/locale", description: "Return a random BCP 47 locale string.", example: "/locale" },
      { path: "/currency", description: "Return a random ISO 4217 currency.", example: "/currency" },
      { path: "/language", description: "Return a random language with ISO code.", example: "/language" }
    ],
    time_and_calendar: [
      { path: "/date/:start_year/:end_year", description: "Generate a random ISO date within a year range.", example: "/date/2020/2026" },
      { path: "/datetime/:start/:end", description: "Generate a random ISO datetime between two dates or datetimes.", example: "/datetime/2020-01-01/2026-12-31" },
      { path: "/timestamp", description: "Generate a Unix timestamp.", variants: ["/timestamp:seconds", "/timestamp:milliseconds"], example: "/timestamp:milliseconds" },
      { path: "/duration", description: "Generate a random duration object and ISO 8601 duration string.", example: "/duration?min_seconds=60&max_seconds=3600" },
      { path: "/relative-date", description: "Generate a relative date phrase and resolved ISO date.", example: "/relative-date" },
      { path: "/business-day", description: "Generate a random business day.", parameters: { country: "Optional country code.", include_holidays: "Boolean. Default false." }, example: "/business-day?country=US" },
      { path: "/weekday", description: "Return a random weekday.", example: "/weekday" },
      { path: "/month", description: "Return a random month.", example: "/month" }
    ],
    developer_formats: [
      { path: "/semver", description: "Generate a semantic version string.", variants: ["/semver:major", "/semver:minor", "/semver:patch", "/semver:prerelease"], example: "/semver:prerelease" },
      { path: "/slug", description: "Generate a URL-friendly slug.", example: "/slug" },
      { path: "/base64/:bytes?", description: "Generate a Base64 encoded random string.", example: "/base64/32" },
      { path: "/base32/:bytes?", description: "Generate a Base32 encoded random string.", example: "/base32/32" },
      { path: "/hex/:bytes?", description: "Generate a hex encoded random string.", example: "/hex/32" },
      { path: "/urlencoded", description: "Generate a URL-encoded random string or parameter set.", example: "/urlencoded" },
      { path: "/regex", description: "Generate a random regex pattern from a lightweight template set.", example: "/regex" },
      { path: "/env", description: "Generate mock environment variable key-value pairs.", example: "/env?keys=5" },
      { path: "/git:commit", description: "Generate a mock Git commit hash and metadata.", example: "/git:commit" },
      { path: "/git:branch", description: "Generate a random Git branch name.", example: "/git:branch" }
    ],
    lightweight_files_and_payloads: [
      { path: "/file/:size_kb", description: "Generate a dummy binary file filled with random bytes. Size should be capped for Worker safety.", example: "/file/256" },
      { path: "/csv", description: "Generate CSV text.", example: "/csv?rows=100&columns=8" },
      { path: "/tsv", description: "Generate TSV text.", example: "/tsv?rows=100&columns=8" },
      { path: "/json", description: "Generate a randomized JSON object.", example: "/json?depth=4&keys=3" },
      { path: "/xml", description: "Generate XML text.", example: "/xml?depth=3&nodes=20" },
      { path: "/yaml", description: "Generate YAML text.", example: "/yaml?depth=3&keys=5" },
      { path: "/svg/:width/:height", description: "Generate a lightweight SVG placeholder. This is the preferred Worker-friendly visual output.", example: "/svg/400/300" },
      { path: "/avatar/:size?", description: "Generate a lightweight SVG identicon/avatar or redirect to an avatar URL.", example: "/avatar/200" }
    ],
    edge_cases_invalid_and_fuzzing: [
      { path: "/edgecase:string", description: "Generate string edge cases.", variants: ["/edgecase:string+empty", "/edgecase:string+long", "/edgecase:string+unicode", "/edgecase:string+emoji", "/edgecase:string+rtl", "/edgecase:string+html", "/edgecase:string+newline", "/edgecase:string+whitespace"], example: "/edgecase:string+unicode" },
      { path: "/edgecase:number", description: "Generate numeric edge cases such as zero, negative values, very large integers, decimals, and boundaries.", example: "/edgecase:number" },
      { path: "/edgecase:json", description: "Generate JSON parser stress cases.", variants: ["/edgecase:json+deep", "/edgecase:json+wide", "/edgecase:json+mixed", "/edgecase:json+unicode"], example: "/edgecase:json+deep" },
      { path: "/invalid:email", description: "Generate invalid email strings for validation tests.", example: "/invalid:email" },
      { path: "/invalid:url", description: "Generate invalid URL strings for validation tests.", example: "/invalid:url" },
      { path: "/fuzz:string", description: "Generate random fuzz strings within Worker-safe size limits.", example: "/fuzz:string?max_length=1024" },
      { path: "/fuzz:json", description: "Generate random JSON fuzz payloads within depth and size limits.", example: "/fuzz:json?depth=5&keys=8" },
      { path: "/fuzz:binary/:bytes?", description: "Generate random binary fuzz data.", example: "/fuzz:binary/512" },
      { path: "/payload:xss", description: "Generate harmless XSS-like test strings for escaping and validation tests.", example: "/payload:xss" },
      { path: "/payload:sql", description: "Generate SQL-injection-like test strings for validation tests.", example: "/payload:sql" },
      { path: "/payload:path", description: "Generate path-traversal-like test strings.", example: "/payload:path" },
      { path: "/payload:command", description: "Generate command-injection-like test strings.", example: "/payload:command" }
    ],
    logs_observability_and_api_mocking: [
      { path: "/log", description: "Generate a structured application log entry.", variants: ["/log:debug", "/log:info", "/log:warn", "/log:error", "/log:fatal"], example: "/log:error" },
      { path: "/log:nginx", description: "Generate an Nginx-style access log line.", example: "/log:nginx" },
      { path: "/log:apache", description: "Generate an Apache-style access log line.", example: "/log:apache" },
      { path: "/metric", description: "Generate a mock metric sample.", example: "/metric" },
      { path: "/trace", description: "Generate a mock distributed trace object.", example: "/trace" },
      { path: "/span", description: "Generate a mock trace span object.", example: "/span" },
      { path: "/alert", description: "Generate a mock monitoring alert.", example: "/alert" },
      { path: "/api-response", description: "Generate a mock API response envelope.", example: "/api-response" },
      { path: "/graphql", description: "Generate a lightweight mock GraphQL response or query string.", variants: ["/graphql:query", "/graphql:response", "/graphql:error"], example: "/graphql:response" }
    ],
    schema_and_scenarios: [
      { path: "/table", description: "Generate a tabular dataset with configurable field types.", example: "/table?rows=25&columns=name,email,age:num" },
      { path: "/schema", method: "POST", description: "Generate random data from a user-provided JSON schema-like field map.", example: "/schema" },
      { path: "/mock", method: "POST", description: "Generate one or more objects from a reusable mock template.", example: "/mock?count=5" },
      { path: "/scenario:ecommerce", description: "Generate a small coherent ecommerce dataset with users, products, orders, and invoices.", example: "/scenario:ecommerce?users=10&orders=50" },
      { path: "/scenario:auth", description: "Generate mock auth-related data such as users, sessions, tokens, and audit events.", example: "/scenario:auth?users=5" },
      { path: "/scenario:analytics", description: "Generate event analytics data.", example: "/scenario:analytics?events=100" },
      { path: "/scenario:observability", description: "Generate logs, metrics, traces, alerts, and service metadata.", example: "/scenario:observability?services=3&events=100" }
    ]
  },
  removed_or_deferred_for_worker_simplicity: [
    {
      feature: "QR image generation",
      reason:
        "Can be implemented later, but it is less essential and may add payload/algorithm complexity. Barcode values are kept as strings."
    },
    {
      feature: "PDF generation",
      reason:
        "PDF rendering is not lightweight for Cloudflare Worker. Use text, JSON, CSV, XML, YAML, SVG, or binary dummy files instead."
    },
    {
      feature: "Raster image generation",
      reason:
        "PNG/JPEG/WebP generation is not lightweight without additional libraries. SVG placeholders and SVG avatars are kept."
    },
    {
      feature: "SSE and long streaming",
      reason:
        "Useful but should be treated as an optional API testing module because it changes runtime and connection behavior."
    },
    {
      feature: "Real keypair, certificate, or TOTP generation",
      reason:
        "Avoid implying security guarantees beyond random value generation unless the implementation is audited and documented."
    }
  ],
  implementation_notes: [
    "Use ':' for finite variants, algorithms, encodings, and modes.",
    "Use path segments for numeric values, lengths, ranges, and counts that are part of the core endpoint shape.",
    "Use query parameters for open-ended filters such as country, locale, currency, domain, min, max, rows, columns, and caps.",
    "Cap output size, depth, rows, bytes, and delay duration to stay Cloudflare Worker friendly.",
    "Seeded generation must be deterministic for the same endpoint, path parameters, query parameters, and seed.",
    "Mock credentials, JWTs, SSH keys, payment cards, payloads, and hashes must clearly state whether they are safe for production security use or only for testing."
  ]
} as const;

