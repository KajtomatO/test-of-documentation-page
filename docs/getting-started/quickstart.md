---
sidebar_position: 2
title: Quickstart
description: Define, run and inspect your first Nimbus job in five minutes.
---

# Quickstart

This page walks you from an empty directory to a job that runs every minute.
It assumes you completed the [Installation](./installation.mdx).

## 1. Start the scheduler

```bash
nimbusd --data-dir ~/.nimbus
```

Leave this running in its own terminal. It logs one line per job run.

## 2. Write a job file

Create a directory for your job definitions and add a first job. The
highlighted lines are the only ones Nimbus requires.

```yaml title="jobs/hello.yaml" {1,3}
name: hello
description: Prints a greeting once a minute
schedule: "* * * * *"
command: ["echo", "hello from nimbus"]
timeout: 30s
```

## 3. Load the job

```bash
nimbus apply jobs/
```

```text
applied  hello  (schedule: * * * * *, next run in 41s)
```

`nimbus apply` is idempotent. Running it again with the same files changes
nothing; running it after editing a file updates only that job.

## 4. Watch it run

```bash
nimbus runs --job hello --follow
```

```text
RUN ID      STARTED               STATUS    DURATION
r_01HXYZ    2026-09-26 22:41:00   success   12ms
r_01HXZA    2026-09-26 22:42:00   success   11ms
```

Press `Ctrl+C` to stop following. Run history stays available through
`nimbus runs` and the [HTTP API](../reference/http-api.md).

:::note
Nothing happens until you `apply`. Editing a YAML file on disk does not change
the running scheduler. This is deliberate: it lets you review job changes in a
pull request before they take effect.
:::

## Where to go from here

- [Defining jobs](../guides/defining-jobs.md) covers every field in a job file.
- [Retries and backoff](../guides/retries-and-backoff.md) explains what happens when a command fails.
