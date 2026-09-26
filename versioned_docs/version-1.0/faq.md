---
sidebar_position: 5
title: FAQ
description: Short answers to common questions about Nimbus.
---

# Frequently asked questions

### Is Nimbus a real product?

No. Nimbus is a fictional scheduler used to give this documentation site
realistic content. The site itself, its build and its deployment pipeline are
real and documented in the repository's `CONTRIBUTING.md` and `SETUP.md`.

### Does Nimbus replace cron?

For a single machine, it is cron with a run history, retries, timeouts and an
API. It does not try to be a distributed workflow engine.

### What happens to scheduled runs while the daemon is down?

They are skipped. On startup the daemon computes the next run of every job
from the current time. If you need catch-up behaviour, trigger the job
manually with `nimbus run`.

### Can a job run on more than one machine?

Not in 1.0. One daemon owns one data directory. Run separate daemons with
separate job sets if you need to spread load.

### How do I get notified when something fails?

Add a `notify.on_failure` list to the job. The only target type in 1.0 is
`mail:`, configured in [Configuration](./reference/configuration.md).

### Where is the run output stored?

In the SQLite store inside the data directory, capped by the `history` keys in
the daemon configuration. Use `nimbus logs RUN_ID` to read it.
