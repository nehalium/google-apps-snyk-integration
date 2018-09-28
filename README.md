# Google Apps script to pull data from Snyk.io

## Installation

1. Create Google Sheet
1. Name one tab "Data"
1. Go to Tools > Script editor
1. Pull code from repo
1. Add file config.gs with the contents below:
1. Go to Edit > Current project's triggers
1. Add a trigger that runs `main` on `Time-driven` events with `Day timer` and select a time period to run

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
