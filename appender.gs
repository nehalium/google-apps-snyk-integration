// Global constants
var SHEET_DATA = "Data";

var Appender = (function() {
  // Public members  
  var appender = {};
  appender.append = append;
  return appender;
  
  // Private members
  function append(items) {
    var values = buildTable(items);
    var sheet = getSheetReference();
    sheet.clear();
    for (var i=0; i<values.length; i++) {
      sheet.appendRow(values[i]);
    }
  }
  
  function buildTable(items) {
    var values = [];
    var row = [];
    
    // Build header row
    row.push('Issue ID');
    row.push('Issue Title');
    row.push('Issue URL');
    row.push('Severity');
    row.push('Type');
    row.push('Project ID');
    row.push('Project Name');
    row.push('Project URL');
    row.push('Introduced On');
    values.push(row);
    
    // Add values
    for (var i=0; i<items.length; i++) {
      row = [];
      row.push(items[i].issue.id);
      row.push(items[i].issue.title);
      row.push(items[i].issue.url);
      row.push(items[i].issue.severity);
      row.push(items[i].issue.type);
      row.push(items[i].project.id);
      row.push(items[i].project.name);
      row.push(items[i].project.url);
      row.push(items[i].introducedDate);
      values.push(row);
    }
    
    return values;
  }
  
  function getSheetReference() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    return spreadsheet.getSheetByName(SHEET_DATA);
  }
})()