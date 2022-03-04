# done-action

A Github Action which suceeds only if all the dependent jobs succeeded.

## Why?

This is useful when configuring a required status check for a
[branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)
in Github: it avoids the need to specify a potentally large number of status
checks.

One particular advantage of such a branch protection rule is that Github offers
you an
["auto-merge"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
feature that will merge a pull request as soon as the required checks complete.

## Usage

Add a job like this to your workflow definition:

```yaml
jobs:
  # ...

  tests-done:
    if: ${{ always() }}
    needs:
      - job_1
      - job_2
    runs-on: ubuntu-latest
    steps:
      - uses: matrix-org/done-action@v1
        with:
          needs: ${{ toJSON(needs) }}
```

Under `needs`, you should list the names of the jobs that you want to complete
for the required status check to pass.
