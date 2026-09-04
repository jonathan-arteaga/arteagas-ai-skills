# Dead code and cleanup

## Inspect

- Unused files, types, functions, properties, assets, and localization strings
- Dead branches, deprecated feature flags, stale tasks, and commented-out code
- Duplicate components and unused dependencies or build settings
- Old preview, mock, test, migration, and compatibility code
- Legacy names that no longer match product concepts

## Use conservative deletion rules

- Confirm references with repository search plus build or test evidence.
- Prefer clearly unused private code and assets.
- Treat public APIs, migrations, schemas, compatibility paths, reflection,
  generated references, and runtime-loaded resources as high risk.
- When evidence is incomplete, record the candidate and the proof still needed.
- Validate after each coherent cleanup batch.

## Report

Separate removed items, deferred candidates, risky areas left untouched, and
validation results.
