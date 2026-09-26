---
sidebar_position: 3
title: HTTP API
description: The REST endpoints exposed by nimbusd.
---

# HTTP API

The daemon serves a JSON API under `/api/v1`. The CLI and the web UI are both
ordinary clients of this API, so anything they can do, you can script.

Authentication is not part of Nimbus 1.0. Bind the daemon to a private
interface or put it behind a reverse proxy that handles authentication.

## Endpoints

| Method and path | Description |
| --- | --- |
| `GET /api/v1/jobs` | List jobs. |
| `PUT /api/v1/jobs` | Apply job definitions. Body is YAML, `Content-Type: application/yaml`. |
| `GET /api/v1/jobs/NAME` | One job with its next scheduled run. |
| `DELETE /api/v1/jobs/NAME` | Delete a job. Add `?purge=true` to drop its history. |
| `POST /api/v1/jobs/NAME/run` | Trigger a run now. Returns the run id. |
| `GET /api/v1/runs` | Run history. Filters: `job`, `status`, `since`. |
| `GET /api/v1/runs/ID` | One run including exit code and captured output. |
| `GET /healthz` | Returns `200 ok` when the scheduler loop is alive. |

## Example: trigger a job and poll for the result

```bash
RUN=$(curl -s -X POST http://localhost:8484/api/v1/jobs/hello/run | jq -r .id)
curl -s "http://localhost:8484/api/v1/runs/$RUN"
```

```json title="Response"
{
  "id": "r_01HXYZ",
  "job": "hello",
  "status": "success",
  "started_at": "2026-09-26T20:41:00Z",
  "finished_at": "2026-09-26T20:41:00.012Z",
  "exit_code": 0,
  "attempt": 1
}
```

## Error format

Errors use a single shape and an appropriate HTTP status code:

```json
{
  "error": "job not found",
  "code": "not_found"
}
```
