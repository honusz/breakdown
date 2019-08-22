/****
* Michael Lynn - http://blog.mlynn.org
* Stitching Sheets - Integrating Google Sheets with MongoDB Using MongoDB Stitch
****/

// Create an object which contains keys for each column in the spreadsheet
var columns = { // 0 indexed
  type: 2,
  date_start: 3,
  date_end: 4,
  loc: 5,
  desc: 0,
  url: 1,
  status: 6,
  owner: 7,
  event_id: 8
}

/****
 * This function runs automatically and adds a menu item to Google Sheets
 ****/
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet.setActiveSheet(sheet.getSheetByName("Datarefs"));
  var entries = [{
    name : "BreakDown",
    functionName : "exportEventsToMongoDB"
  },{
    name: "Remove All Events from MongoDB (Delete Documents)",
    functionName: "removeEventsFromMongoDB"
  }];
  sheet.addMenu("Breakdown", entries);
};

/****
 * Export the events from the sheet to a MongoDB Database via Stitch
 ****/
function exportEventsToMongoDB() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Events");
  var headerRows = 1;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange(); // determine the range of populated data
  var numRows = range.getNumRows(); // get the number of rows in the range
  var data = range.getValues(); // get the actual data in an array data[row][column]
  
  for (var i=headerRows; i<numRows; i++) {
    var eventIdCell = range.getCell(i+1, columns.event_id+1);
    var desc = data[i][columns.desc];
    var date_start = Utilities.formatDate(new Date(data[i][columns.date_start]), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
    var date_end = Utilities.formatDate(new Date(data[i][columns.date_end]), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");    
    // Make a POST request with form data.
    var formData = {
      'name': data[i][columns.desc],
      'location': data[i][columns.loc],
      'date_start': date_start,
      'date_end': date_end,
      'status': data[i][columns.status],
      'owner': data[i][columns.owner],
      'url': data[i][columns.url],
      'type': data[i][columns.type],
      'event_id': data[i][columns.event_id]
    };
    var options = {
      'method' : 'post',
      'payload' : formData
    };
    if (desc) {
      var insertID = UrlFetchApp.fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitch-sheets-zkvuv/service/sheets/incoming_webhook/import', options);
      eventIdCell.setValue(insertID); // Insert the new event ID
    }
  }
}

/****
 * Delete the events from the Calendar and remover the eventID Reference from the sheet - wipeout.
 ****/
function removeEventsFromMongoDB() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Events");
  var headerRows = 1;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange();
  var numRows = range.getNumRows();
  var data = range.getValues();
  
  for (var i=headerRows; i<numRows; i++) {
    // Cells are 1 indexed
    var eventIdCell = range.getCell(i+1, columns.event_id+1);
    // Make a POST request with form data.
    var formData = {
      'name': data[i][columns.desc],
      'location': data[i][columns.loc],
      'date_start': data[i][columns.date_start],
      'date_end': data[i][columns.date_end],
      'status': data[i][columns.status],
      'owner': data[i][columns.owner],
      'type': data[i][columns.type],
      'event_id': data[i][columns.event_id]
    };
    var options = {
      'method' : 'post',
      'payload' : formData
    };
    var insertID = UrlFetchApp.fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitch-sheets-zkvuv/service/sheets/incoming_webhook/remove', options);
    eventIdCell.setValue(""); // Insert the new event ID
  }
}