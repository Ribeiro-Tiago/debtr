# How to contribute

If you want to help with the development of Debtr, please follow the following rules.

## Reporting bugs and feature requests

- Check if the issue has already been [reported](https://github.com/Ribeiro-Tiago/debtr/issues). (including closed tickets).
- Create a ticket for your issue.
- Describe the issue clearly and succinctly.
- In case of bug reports:
  - describe the steps required to reproduce issue,
  - attach a [backtrace](http://en.wikipedia.org/wiki/Stack_trace) if you have any,
  - post details about your setup:
    - application version,
    - system version
    - platform you were running and it's specifications

## New features or fixes

- Fork the repository on GitHub.
- Create your feature branch (git checkout -b my-new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Update the [CHANGELOG](https://github.com/Ribeiro-Tiago/debtr/edit/master/CONTRIBUTING.md) to reflect your change
- Push to the branch (git push origin my-new-feature)
- Create new Pull Request, describe what the issue was how your PR resolves it
- Patiently wait for the review.

## Coding rules

- Use prettier with the configurations included in the project
- Type everything you add
- Use **const** for every variable whose value doesn't change (array items and object properties don't count), otherwise use **let**
