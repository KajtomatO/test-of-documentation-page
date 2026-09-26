---
sidebar_position: 1
title: CLI reference
description: Every nimbus and nimbusd command and its most useful flags.
---

# CLI reference

All commands accept `--server URL` (default `http://localhost:8484`) and
`--json` for machine-readable output.

## `nimbus` commands

| Command | Description |
| --- | --- |
| `nimbus apply DIR...` | Load or update every job file in the given directories. |
| `nimbus validate DIR...` | Parse job files and report errors without applying. |
| `nimbus jobs` | List jobs with their schedule and next run. |
| `nimbus run JOB` | Trigger a job immediately, ignoring its schedule. |
| `nimbus runs [--job JOB] [--status STATUS] [--since DURATION] [--follow]` | Show run history. |
| `nimbus logs RUN_ID` | Print stdout and stderr of one run. |
| `nimbus pause JOB` / `nimbus resume JOB` | Temporarily stop scheduling a job without deleting it. |
| `nimbus delete JOB` | Remove a job and, with `--purge`, its run history. |
| `nimbus doctor` | Check the local installation. |

## `nimbusd` flags

| Flag | Default | Description |
| --- | --- | --- |
| `--data-dir` | `~/.nimbus` | Location of the store and lock file. |
| `--listen` | `127.0.0.1:8484` | Address for the HTTP API and web UI. |
| `--config` | `DATA_DIR/nimbusd.yaml` | Daemon configuration file, see [Configuration](./configuration.md). |
| `--log-level` | `info` | `debug`, `info`, `warn` or `error`. |

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `1` | Generic error, details on stderr. |
| `2` | Invalid arguments or job file. |
| `3` | Could not reach the daemon. |

## Examples

```bash
# Re-run every job that failed in the last hour
nimbus runs --status failed --since 1h --json \
  | jq -r '.[].job' | sort -u \
  | xargs -n1 nimbus run
```
