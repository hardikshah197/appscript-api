// This function is used to ask for the permission to edit the document, to access the google account.
function initialize() {
  let doc = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty("key", doc.getId());
}

// This function is used to handle/recieve the HTTP API request
function doGet(request) {
  let { query } = request.parameters;
  let parameters = 4; // Number of columns in google sheet
  let sheetName = "Sheet1";

  let doc = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("key"));
  let sheet = doc.getSheetByName(sheetName);

  let lastRow = sheet.getLastRow();
  let rows = [];

  let range = sheet.getRange(2, 1, lastRow, parameters);
  let values = range.getValues();

  for(let row in values) {
    rows.push([]);
    for(let col in values[row]) {
      rows[row].push(values[row][col]);
    }
  }

  if (query) {
    let filteredResponse = rows.filter(r => a[1] == query);
    return ContentService.createTextOutput(JSON.stringify({ "data": filteredResponse, "error": false })).setMimeType(ContentService.MimeType.JSON);
    // The above line will convert the data into JSON
  }

  return ContentService.createTextOutput(JSON.stringify({ "data": rows, "error": false })).setMimeType(ContentService.MimeType.JSON);
}



/**
 * Deployment URLs
 * v1.0.0: https://script.google.com/macros/s/AKfycbymBLmmv5JGEIzvNbweypI2mpH5RTeqJ5TrJ-Kgo-pN0mhN3zEdbHtaoznpaUx6eT07Hg/exec
 * v1.0.2: https://script.google.com/macros/s/AKfycbzY44dJyzGnTSTZKF9ZN-ifXuEwDbu5EPi27cVkTNWiwwUdCDSNjpa8AqFkNmDDQEVn1w/exec
 */