---
sidebar_position: 1
title: Defining jobs
description: The job file format, field by field.
---

# Defining jobs

A job is one YAML document. Nimbus loads every `*.yaml` file in the directory
you pass to `nimbus apply`, so one file per job is the convention, but a file
may also contain several documents separated by `---`.

## A complete example

```yaml title="jobs/nightly-report.yaml"
name: nightly-report
description: Builds the sales report and uploads it
schedule: "0 2 * * *"        # every day at 02:00 server time
timezone: Europe/Warsaw
command: ["./bin/build-report", "--date", "yesterday"]
workdir: /srv/reports
env:
  REPORT_FORMAT: pdf
timeout: 15m
retries:
  attempts: 3
  backoff: exponential
  initial_delay: 1m
concurrency: forbid
notify:
  on_failure: ["mail:ops@example.com"]
```

## Fields

| Field | Required | Default | Meaning |
| --- | --- | --- | --- |
| `name` | yes | | Unique identifier, `[a-z0-9-]` only. Used in the CLI and API. |
| `description` | no | | Free text shown in listings. |
| `schedule` | no | | Five-field cron expression. Omit it for jobs that only run on demand. |
| `timezone` | no | `UTC` | IANA zone the schedule is evaluated in. |
| `command` | yes | | Program and arguments as a list. No shell is involved. |
| `workdir` | no | data dir | Working directory for the command. |
| `env` | no | | Extra environment variables. |
| `timeout` | no | `10m` | Kill the run after this long and mark it `timeout`. |
| `retries` | no | none | See [Retries and backoff](./retries-and-backoff.md). |
| `concurrency` | no | `allow` | `allow`, `forbid` (skip if previous run still active) or `replace`. |
| `notify` | no | | Targets for `on_failure`, `on_success`, `on_recovery`. |

:::warning No shell, on purpose
`command` is executed directly, not through `sh -c`. Pipes, globs and variable
expansion do not work. Put such logic in a script and call the script.
:::

:::note Cron syntax
Nimbus uses the standard five fields: minute, hour, day of month, month, day of
week. The shortcuts `@hourly`, `@daily`, `@weekly` and `@monthly` are accepted.
:::

## Validating without applying

```bash
nimbus validate jobs/
```

`validate` parses every file, checks required fields and cron syntax, and exits
non-zero on the first problem. Run it in CI for the repository that holds your
job files.
