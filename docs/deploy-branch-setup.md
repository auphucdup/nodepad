# Deploy Branch Setup

This repo is configured with:

- `origin`: your fork at `https://github.com/auphucdup/nodepad.git`
- `upstream`: the original repo at `https://github.com/mskayyali/nodepad.git`

Use `main` as your local mirror of upstream, and keep your custom changes on a separate branch called `deploy`.

## One-time setup

Start from `main`, make sure it matches upstream, then create and push `deploy`.

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

git checkout -b deploy
git push -u origin deploy
```

After that:

- make your app changes on `deploy`
- commit them on `deploy`
- deploy from `deploy`

## Day-to-day work

When you want to continue working on your custom version:

```bash
git checkout deploy
git pull
```

Make changes, then commit and push:

```bash
git add .
git commit -m "Describe your change"
git push
```
