# google-apps-snyk-integration

## Installation

1. Pull code from repo
1. Add file config.gs with the following contents:

```
var Config = {
  snyk: {
    url: 'https://snyk.io/api/v1/',
    token: 'ADD API TOKEN HERE',
    orgs: [
      'ADD ORGS BY ID HERE'
    ],
    paths: {
      issues: 'reporting/issues/'
    },
    search: {
      days_past: 30
    }
  }
};
```
