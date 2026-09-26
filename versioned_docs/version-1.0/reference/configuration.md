---
sidebar_position: 2
title: Configuration
description: Keys accepted in the nimbusd.yaml daemon configuration file.
---

# Configuration

`nimbusd` reads an optional YAML file from `DATA_DIR/nimbusd.yaml` or the path
given with `--config`. Every key has a default, so an empty file is valid.

```yaml title="nimbusd.yaml"
listen: 0.0.0.0:8484
log_level: info
history:
  keep_runs: 500
  keep_days: 30
workers:
  max_parallel: 8
notify:
  mail:
    smtp: smtp.example.com:587
    from: nimbus@example.com
```

## Keys

| Key | Default | Description |
| --- | --- | --- |
| `listen` | `127.0.0.1:8484` | Address for the API and UI. Overridden by `--listen`. |
| `log_level` | `info` | Overridden by `--log-level`. |
| `history.keep_runs` | `200` | Maximum run records kept per job. Oldest are pruned first. |
| `history.keep_days` | `14` | Run records older than this are pruned regardless of count. |
| `workers.max_parallel` | number of CPUs | Upper bound on concurrently running jobs across the whole daemon. |
| `notify.mail.smtp` | | SMTP host and port for `mail:` notification targets. |
| `notify.mail.from` | `nimbus@localhost` | Sender address. |

## Environment variables

Every key can also be set with an environment variable named
`NIMBUS_` followed by the key path in upper case with dots replaced by
underscores, for example `NIMBUS_HISTORY_KEEP_DAYS=90`. Environment variables
take precedence over the file.

:::warning
Changing `listen` or `workers.max_parallel` requires a daemon restart. All
other keys are re-read when the daemon receives `SIGHUP`.
:::
