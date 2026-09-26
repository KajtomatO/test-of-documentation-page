---
sidebar_position: 4
title: Webhooks
description: Trigger a Nimbus job from an HTTP request instead of a cron schedule.
---

# Webhooks

:::info Unreleased
Webhooks are new in Nimbus **1.1**, which is not released yet. This page only
exists in the **Next** version of the documentation. Switch the version
dropdown in the navbar to **1.0** and this page disappears from the sidebar.
:::

A webhook lets an external system start a job by sending an HTTP request,
without giving that system access to the full [HTTP API](../reference/http-api.md).

## Enabling a webhook on a job

```yaml title="jobs/deploy-preview.yaml" {4-6}
name: deploy-preview
description: Builds a preview environment for a pull request
command: ["./bin/deploy-preview"]
webhook:
  enabled: true
  secret_env: DEPLOY_PREVIEW_SECRET
```

`secret_env` names an environment variable of the daemon that holds a shared
secret. Nimbus never stores the secret in the job file or the store.

## Calling it

```bash
curl -X POST http://localhost:8484/hooks/deploy-preview \
  -H "X-Nimbus-Signature: $(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | cut -d' ' -f2)" \
  -d "$BODY"
```

The request body is passed to the job as the `NIMBUS_WEBHOOK_BODY` environment
variable. The response is `202 Accepted` with the run id, exactly like
`POST /api/v1/jobs/NAME/run`.

## Differences from a manual run

| | `nimbus run` / API | Webhook |
| --- | --- | --- |
| Authentication | none (network-level) | HMAC signature per job |
| Payload | none | request body |
| Respects `concurrency: forbid` | yes | yes |
| Counts towards `retries` | yes | yes |
