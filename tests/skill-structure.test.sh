#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

assert_grep() {
  local pattern="$1"
  local file="$2"
  grep -Eq "$pattern" "$file" || fail "expected pattern '$pattern' in $file"
}

assert_not_grep() {
  local pattern="$1"
  local file="$2"
  if grep -Eq "$pattern" "$file"; then
    fail "unexpected pattern '$pattern' in $file"
  fi
}

assert_max_lines() {
  local file="$1"
  local max="$2"
  local lines
  lines="$(wc -l < "$file" | tr -d ' ')"
  [[ "$lines" -le "$max" ]] || fail "$file has $lines lines; expected <= $max"
}

cd "$ROOT"

assert_grep '^description: Use when studying, reverse-engineering, comparing, reviewing, or learning from AI skill packages' SKILL.md
assert_grep 'Markdown report, structured pattern notes, or multi-page web handbook' SKILL.md
assert_not_grep '^generation/' <(git ls-files)

assert_max_lines references/web-app-visuals.md 120
assert_max_lines references/web-production-flow.md 220
assert_max_lines references/stage-writing.md 300

echo "skill structure tests passed"
