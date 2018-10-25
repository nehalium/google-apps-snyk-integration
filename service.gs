// Main entry point
function main() { 
  var data = Snyk.getData();
  Appender.append(data.items);
}
