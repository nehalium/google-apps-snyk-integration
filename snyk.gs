var Snyk = (function() {
  // Public members  
  var snyk = {};
  snyk.getData = getData;
  return snyk;
  
  // Private members
  function getData() {
    var items = [];
    var count = 0;
    var page = 1;
    
    // Set dates
    var toDate = new Date();
    var fromDate = getPastDate(Config.snyk.search.days_past);
    
    while(true) {
      var result = executeQuery(getQuery(fromDate, toDate, page, 1000));
      var results = result.results;
      if (results.length === 0) {
        break;
      }
      for(var i=0; i<results.length; i++) {
        count++;
        items.push(results[i]);
      }
      
      page++;
    }
    
    return {
      items: items,
      count: count
    };
  }
  
  // Queries the API
  function executeQuery(query) {
    var options = {
      method: 'POST',
      muteHttpExceptions: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + Config.snyk.token
      },
      payload: getFilters()
    };
    var response = UrlFetchApp.fetch(Config.snyk.url + Config.snyk.paths.issues + query, options);
    var json = response.getContentText();
    return JSON.parse(json);
  }
  
  // Returns the filters object for the API request
  function getFilters() {
    return JSON.stringify({
      filters: {
        orgs: Config.snyk.orgs,
        severity: [
          'high',
          'medium',
          'low'
        ],
        types: [
          'vuln',
          'license'
        ],
        languages: [
          'node',
          'ruby',
          'java'
        ],
        projects: [],
        issues: [],
        ignored: false,
        patched: false,
        fixable: false,
        isFixed: false,
        isUpgradable: false,
        isPatchable: false
      }
    });
  }
  
  // Returns a date object for the specified days in the past
  function getPastDate(daysPast) {
    var pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - daysPast);
    return pastDate;
  }
  
  // Returns a formatted data
  // e.g. 2016-09-12
  function formatDate(date) {
    return Utilities.formatDate(date, 'Etc/GMT', 'yyyy-MM-dd');
  }
  
  // Returns the URI query for the API request
  function getQuery(from, to, page, perPage) {
    var query = '';
    query += '?from=' + formatDate(from)
    query += '&to=' + formatDate(to)
    query += '&page=' + page
    query += '&perPage=' + perPage
    query += '&sortBy=issueTitle'
    query += '&order=asc'
    return query;
  }
})()