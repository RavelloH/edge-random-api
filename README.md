# Edge Random API

A lightweight random data generation API designed for Cloudflare Workers.

Edge Random API provides cryptographically secure random values, mock data, identifiers, test payloads, and developer-friendly fixtures from simple HTTP endpoints. It is intended for developers who need fast random data for testing, prototypes, CLI usage, UI placeholders, API mocks, and edge-case validation.

> Randomness note: default generation uses the Web Crypto API CSPRNG available in the Cloudflare Workers runtime. This is cryptographically secure randomness for practical engineering use, but it is not physical true randomness. Requests with `seed` use deterministic PRNG output for reproducibility.

## Features

- Cryptographically secure random numbers, strings, bytes, tokens, and passwords
- UUID, ULID, NanoID, ObjectId, KSUID, XID, Snowflake-style IDs, trace IDs, and span IDs
- Mock users, people, companies, products, orders, invoices, names, emails, and addresses
- Dates, datetimes, timestamps, durations, business days, weekdays, and months
- Network data such as IPs, MAC addresses, ports, domains, URLs, headers, cookies, and status codes
- Developer formats such as Base64, Base32, hex, semver, slugs, env files, regex patterns, and Git metadata
- Lightweight file and payload generation: JSON, CSV, TSV, XML, YAML, SVG, avatars, and binary files
- Edge-case, invalid, fuzzing, and security-test payloads
- Schema-based and scenario-based mock data generation

## Base URL

```text
https://random.ravelloh.com
```

When `GET /` is requested, the Worker returns the API description JSON. The `base_url`
field is derived from the incoming `Host` header, and the response includes the
GitHub repository metadata for `RavelloH/edge-random-api`.

## Cloudflare Worker

This repository includes a TypeScript Cloudflare Worker implementation.

```bash
npm install
npm run dev
npm run check
npm run deploy
```

The Worker uses Web Crypto randomness by default and switches to a deterministic
seeded PRNG when `seed` is provided. Generated payloads are capped to stay
Worker-friendly.

## Routing Model

The API uses a compact routing style optimized for predictable parsing:

```text
/:resource                    default generator
/:resource:variant            finite type, format, algorithm, or mode
/:resource:variantA+variantB  combined variants
/:resource/:length            length, count, or numeric argument
/:resource/:min/:max          numeric range
?country=US&locale=en-US      open-ended filters and optional settings
```

Examples:

```text
/uuid
/uuid:v7
/str:hex/16/32
/crypto:base64url/32
/hash:sha256
/ip:v6
/name:female?locale=en-US
/money?currency=USD&min=10&max=500
```

## Global Query Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `count` | integer | Number of results to return. Default `1`, max `100`. |
| `format` | string | Response format for data endpoints. Default `text`; use `json` for the standard response envelope. |
| `seed` | string | Deterministic seed for reproducible output. Seeded output is not cryptographically secure. |

## Response Format

Default data endpoint response is plain text:

```text
018f2f6a-7c30-7b2c-9d4a-86f3c1d4f0aa
```

Use `?format=json` for the standard JSON response:

```json
{
  "meta": {
    "type": "uuid",
    "count": 1,
    "timestamp": "2026-05-11T03:00:00.000Z",
    "latency_ms": 0.42,
    "randomness": {
      "source": "web_crypto_csprng",
      "seeded": false,
      "security": "cryptographically_secure"
    }
  },
  "data": "018f2f6a-7c30-7b2c-9d4a-86f3c1d4f0aa"
}
```

In JSON format, when `count=1`, `data` is a single value. When `count>1`,
`data` is an array. `GET /` still returns the API description JSON by default.

## Endpoint Overview

### Randomness And Entropy

```text
/entropy/:bytes
/entropy:hex/:bytes
/entropy:base64/:bytes
/entropy:base64url/:bytes
/randomness
/randomness:test
```

### Core Types

```text
/num/:exact_or_min/:max?
/float/:exact_or_min/:max?
/decimal/:exact_or_min/:max?
/str/:exact_or_min/:max?
/str:hex/16/32
/str:alpha+num/24
/bool/:probability?
/null
```

### Security Credentials

```text
/password/:length
/passphrase/:words
/pin/:length
/otp/:length?
/token/:bytes
/token:hex/:bytes
/token:base64/:bytes
/token:base64url/:bytes
/apikey
/secret/:bytes?
/nonce/:bytes?
/csrf/:bytes?
/sessionid/:bytes?
/recovery-codes/:count?
/crypto:hex/:bytes
/hash:sha256
/sshkey:ed25519
/jwt
/jwt:hs256
```

Mock JWTs, SSH keys, payment cards, and simulated hashes must be clearly documented as test data unless implemented and audited for production security use.

### Identifiers

```text
/uuid
/uuid:v4
/uuid:v7
/ulid
/nanoid/:length?
/cuid2
/objectid
/ksuid
/xid
/snowflake
/traceid
/spanid
```

### Math, Distributions, And Collections

```text
/prime/:exact_or_min/:max?
/gaussian/:mean/:std
/poisson/:lambda
/bernoulli/:probability
/uniform/:min/:max
/exponential/:lambda
/weighted-pick
/sample
/shuffle
/range/:min/:max
/vector/:length
/matrix/:rows/:columns
```

### Mock Text And Identity

```text
/lorem:word/:amount
/lorem:sentence/:amount
/lorem:para/:amount
/lorem:html/:amount
/words/:count
/sentence/:count?
/paragraph/:count?
/markdown
/quote
/name
/name:male
/name:female
/email
/phone
/username
/bio
```

### Business And Commerce

```text
/person
/user
/company
/job
/product
/price
/money
/creditcard:visa
/creditcard:mastercard
/creditcard:amex
/iban
/orderid
/order
/invoice
/sku
/barcode:ean13
/barcode:upc
/barcode:code128
```

### Network And System

```text
/ip:v4
/ip:v6
/mac
/mac:colon
/mac:dash
/port
/useragent
/useragent:desktop
/useragent:mobile
/domain
/url
/mime
/cron
/headers
/cookies
/cookies:request
/cookies:response
/status/:code_or_class
/redirect/:count?
/delay/:max_ms
```

### Geo, Color, And Localization

```text
/color
/color:hex
/color:rgb
/color:hsl
/color:dark
/color:light
/palette/:count?
/palette:analogous/:count?
/palette:complementary/:count?
/geo
/geo:bbox
/geohash/:length?
/country
/city
/address
/street
/postalcode
/timezone
/locale
/currency
/language
```

### Time And Calendar

```text
/date/:start_year/:end_year
/datetime/:start/:end
/timestamp
/timestamp:seconds
/timestamp:milliseconds
/duration
/relative-date
/business-day
/weekday
/month
```

### Developer Formats

```text
/semver
/semver:major
/semver:minor
/semver:patch
/semver:prerelease
/slug
/base64/:bytes?
/base32/:bytes?
/hex/:bytes?
/urlencoded
/regex
/env
/git:commit
/git:branch
```

### Lightweight Files And Payloads

```text
/file/:size_kb
/csv
/tsv
/json
/xml
/yaml
/svg/:width/:height
/avatar/:size?
```

The API intentionally favors Worker-friendly formats such as text, JSON, CSV, XML, YAML, SVG, and capped binary output. Heavy raster image generation, QR rendering, and PDF generation are deferred.

### Edge Cases, Invalid Data, And Fuzzing

```text
/edgecase:string
/edgecase:string+empty
/edgecase:string+long
/edgecase:string+unicode
/edgecase:string+emoji
/edgecase:string+rtl
/edgecase:number
/edgecase:json
/invalid:email
/invalid:url
/fuzz:string
/fuzz:json
/fuzz:binary/:bytes?
/payload:xss
/payload:sql
/payload:path
/payload:command
```

### Logs, Observability, And API Mocking

```text
/log
/log:debug
/log:info
/log:warn
/log:error
/log:nginx
/log:apache
/metric
/trace
/span
/alert
/api-response
/graphql:query
/graphql:response
/graphql:error
```

### Schema And Scenarios

```text
/table
/schema
/mock
/scenario:ecommerce
/scenario:auth
/scenario:analytics
/scenario:observability
```

## Worker-Friendly Constraints

To keep the API fast and reliable on Cloudflare Workers:

- Cap generated bytes, file sizes, rows, columns, object depth, and collection sizes.
- Prefer built-in Web Crypto and small static dictionaries over heavy dependencies.
- Prefer SVG placeholders over raster image generation.
- Treat long streaming, PDF rendering, QR image rendering, and real certificate/keypair generation as optional future modules.
- Keep `seed` behavior deterministic across the same endpoint, path parameters, query parameters, and seed value.


## License

MIT
