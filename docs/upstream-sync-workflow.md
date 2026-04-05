# Upstream Sync Workflow

This is the safe merge-based workflow for keeping your `deploy` branch current with changes from the original repository.

## Update `main` from the original repo

Run:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

What this does:

- updates your local `main` from `upstream/main`
- pushes that updated `main` to your fork on GitHub

## Bring those upstream changes into `deploy`

Run:

```bash
git checkout deploy
git merge main
git push origin deploy
```

What this does:

- keeps your custom branch based on the latest upstream code
- preserves your custom commits on `deploy`

## Full update sequence

When upstream has changed and you want to refresh your deployed branch:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

git checkout deploy
git merge main
git push origin deploy
```

## If there is a merge conflict

Git will stop and tell you which files conflict.

Resolve the files, then run:

```bash
git add <resolved-files>
git commit
git push origin deploy
```

If you want to abandon the merge instead:

```bash
git merge --abort
```

## Recommended rule

Do not make custom edits on `main`.

Use:

- `main` for tracking upstream
- `deploy` for your actual modified version

That separation makes future upstream integration much easier.
