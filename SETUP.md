# GitHub configuration

Everything in this file is done once, in the GitHub web UI. Nothing here is
needed for local development; it is needed for the site to be published.

The site is published as a GitHub Pages **project site**, so its address is
derived from the owner and repository name:

```
https://<owner>.github.io/<repository>/
https://kajtomato.github.io/test-of-documentation-page/
```

## 1. Check the prerequisites

| Requirement | Why | Current state |
| --- | --- | --- |
| Repository is **public**, or the owner has GitHub Pro / Team / Enterprise | GitHub Pages is not available for private repositories on the Free plan | Public |
| Default branch is `main` | Both workflows trigger on `main` | `main` |
| GitHub Actions is enabled for the repository | The site is built and deployed by Actions | Enabled by default |

## 2. Set the Pages source to GitHub Actions (mandatory)

1. Open the repository on GitHub and go to **Settings**.
2. In the left sidebar choose **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
   Do not choose "Deploy from a branch"; this project has no `gh-pages` branch.
4. Leave the page. There is no save button; the choice is stored immediately.

Without this step the deploy job fails with an error like
`Error: Failed to create deployment ... HttpError: Not Found` or
`Get Pages site failed`.

GitHub creates an environment named `github-pages` the first time this is
used. Its default deployment-branch rule only allows the default branch, which
is what we want.

## 3. Check the Actions permissions

Go to **Settings → Actions → General**.

- **Actions permissions:** "Allow all actions and reusable workflows" is fine.
  If your organisation restricts actions, allow at least
  `actions/checkout`, `actions/setup-node`, `actions/upload-pages-artifact`
  and `actions/deploy-pages` (all owned by GitHub).
- **Workflow permissions:** the default "Read repository contents and packages
  permissions" is sufficient. `deploy.yml` declares the extra `pages: write`
  and `id-token: write` permissions it needs itself.

## 4. Trigger the first deployment

Push to `main` (or open the **Actions** tab, select **Deploy to GitHub Pages**
and click **Run workflow**). The run has two jobs:

1. **Build**: installs dependencies, type-checks, runs `docusaurus build`,
   uploads the `build/` directory as an artifact.
2. **Deploy**: publishes the artifact. When it finishes, the job summary shows
   the site URL.

The first deployment can take a minute or two longer than later ones while
GitHub provisions the site. Subsequent deployments are typically live within
two to three minutes of the push.

## 5. Recommended: protect `main` with the PR build check

`test-deploy.yml` runs a build on every pull request. To stop broken docs from
being merged:

1. Go to **Settings → Rules → Rulesets → New ruleset → New branch ruleset**
   (or the older **Settings → Branches → Add branch protection rule**).
2. Target the `main` branch.
3. Enable **Require status checks to pass** and add the check named
   **`test-build`**. The check only appears in the list after it has run at
   least once, so open a trivial pull request first if it is missing.
4. Optionally enable **Require a pull request before merging**.

## 6. If the repository is renamed, moved, or gets a custom domain

The site URL is baked into the build. Update these values in
`docusaurus.config.ts` and push:

| Config key | Current value | Set it to |
| --- | --- | --- |
| `url` | `https://kajtomato.github.io` | `https://<owner>.github.io`, or `https://<your-domain>` for a custom domain |
| `baseUrl` | `/test-of-documentation-page/` | `/<repository>/`, or `/` for a custom domain or a `<owner>.github.io` repository |
| `organizationName` | `KajtomatO` | the new owner |
| `projectName` | `test-of-documentation-page` | the new repository name |

Also update the GitHub links in `docusaurus.config.ts` (`editUrl`, navbar and
footer items) and the URLs in `README.md`.

For a custom domain, additionally:

1. Add a file `static/CNAME` containing only the domain, e.g. `docs.example.com`.
   Docusaurus copies it into the build so it survives every deployment.
2. Create a DNS `CNAME` record pointing the domain at `<owner>.github.io`.
3. In **Settings → Pages → Custom domain** enter the domain, wait for the DNS
   check, then tick **Enforce HTTPS**.

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Deploy job fails with `HttpError: Not Found` or `Get Pages site failed` | Pages source is not set to GitHub Actions | Step 2 |
| Deploy job fails with `Resource not accessible by integration` | Workflow permissions were overridden to read-only for `pages`/`id-token` | Step 3; the `permissions` block in `deploy.yml` must be intact |
| Deploy job is stuck on "Waiting for review" | A protection rule was added to the `github-pages` environment | **Settings → Environments → github-pages**, remove the required reviewers or approve the deployment |
| Site loads but CSS/JS return 404, or links point to the wrong path | `baseUrl` does not match the repository name | Step 6 |
| Build fails with `Docusaurus found broken links` | A page links to a path that does not exist | Fix the link. This is intentional (`onBrokenLinks: 'throw'`), see CONTRIBUTING.md |
| Build fails with a TypeScript error | `docusaurus.config.ts` or a React component has a type error | Run `npm run typecheck` locally |
| Old content is still served after a successful deployment | Browser or CDN cache | Hard-reload; GitHub's CDN can take a few minutes |
