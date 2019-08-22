function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet.setActiveSheet(sheet.getSheetByName("Datarefs"));
  var entries = [{
    name : "Generate Shooting Schedule",
    functionName : "genShootSched"
  },{
    name: "Remove All Events from MongoDB (Delete Documents)",
    functionName: "removeEventsFromMongoDB"
  }];
  sheet.addMenu("Breakdown", entries);
};
