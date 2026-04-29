<!--suppress HtmlDeprecatedAttribute -->
<h1 align="center">Security Policy</h1>

<div align="center">
  <h6>
    <a rel="noopener noreferrer" href="README.md">Readme</a>
    ·
    <a rel="noopener noreferrer" href="CODE_OF_CONDUCT.md">Code of Conduct</a>
    ·
    <a rel="noopener noreferrer" href="CONTRIBUTING.md">Contributing</a>
    ·
    <a rel="noopener noreferrer" href="SUPPORT.md">Support</a>
    ·
    <a rel="noopener noreferrer" href="LICENSE.md">License</a>
  </h6>
</div>

<h1></h1>

This repository is a submodule of the OctalWeb platform and follows the general
OctalWeb security model.
Some security aspects are handled locally, while others are coordinated
centrally at the platform level.

## Relationship to OctalWeb Security Policy

- This repository is part of the OctalWeb ecosystem
- Security reports may be handled:
  - directly within this submodule, or
  - escalated and coordinated through the central OctalWeb security process

If there is a conflict between this document and the platform-level `SECURITY.md`,
the stricter policy takes precedence.

> [!CAUTION]
> **Do not open a public issue, discussion, or pull request to report a security
> vulnerability.** Use the private channels listed below.

## Reporting a Vulnerability

| Channel                 | Details                                                                |
|-------------------------|------------------------------------------------------------------------|
| **Email** *(preferred)* | [security@octalmesh.com](mailto:security@octalmesh.com)                |
| **Direct contact**      | Reach a core [maintainer](https://github.com/nykonhrytsyshyn) directly |

### Please include as much of the following information as possible:

- Type of issue
  *(e.g. authentication bypass, RCE, SQL injection, XSS, CSRF, data exposure,
  logic flaw)*
- Affected component(s), module(s), or service(s)
- Location of the issue
  *(repository, branch, commit, or direct URL if public)*
- Configuration or environment assumptions
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code *(if available)*
- Expected and actual behavior
- Potential impact and realistic attack scenarios

Incomplete reports are still welcome, but detailed reports allow faster and more
accurate triage.

### Security reports are accepted in:

- English
- Ukrainian
- Russian

## Response Timeline

| Stage                  | Target                         |
|------------------------|--------------------------------|
| **Acknowledgement**    | Within 48 hours                |
| **Initial assessment** | Within 5 business days         |
| **Fix & disclosure**   | As soon as reasonably possible |

Timelines may vary depending on severity and complexity.

## Scope

This policy applies to:

- This repository and its source code
- Build artifacts and configurations maintained here
- Integrations explicitly owned by this submodule

Third-party services and dependencies follow their own security policies.

<h1></h1>

<h6 align="center">
Security research helps keep Commodore reliable and boring - exactly how
security should be
</h6>
