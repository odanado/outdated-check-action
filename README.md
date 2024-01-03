# outdated-check-action

`outdated-check-action` measures outdated dependencies by major, minor, and patch versions, providing counts and percentages.

## Usage

See [action.yml](action.yml)

```yaml
name: "oudated-check"
on:
  workflow_dispatch:
  # cron: # if needed

jobs:
  outdated-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - run: npm ci

      - name: run outdate check
        uses: odanado/outdated-check-action@v0
        id: outdate-check
```

## Inputs

- `package-manager`: Package manager to use. Default: `npm`
- `cwd`: Working directory. Default: `./`

## Outputs

- `total-dependencies-count`: Total number of dependencies.
- `outdated-dependencies-count`: Total number of outdated dependencies.
- `latest-dependencies-count`: Total number of latest dependencies.

- `outdated-dependencies-percentage`: Percentage of outdated dependencies.
- `latest-dependencies-percentage`: Percentage of latest dependencies.

- `outdated-major-dependencies-count`: Total number of outdated major dependencies.
- `outdated-minor-dependencies-count`: Total number of outdated minor dependencies.
- `outdated-patch-dependencies-count`: Total number of outdated patch dependencies.

- `outdated-major-dependencies-percentage`: Percentage of outdated major dependencies.
- `outdated-minor-dependencies-percentage`: Percentage of outdated minor dependencies.
- `outdated-patch-dependencies-percentage`: Percentage of outdated patch dependencies.

## Example

See [dogfooding.yml](.github/workflows/dogfooding.yml)

## Development

### Publish new version

1. Update `VERSION` file.
2. Push to `main` branch.
3. Create a new release.
