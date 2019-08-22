

function getHighQTY(Date, Position, Split) {
    Logger.log("hello");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("LabourGrid");
  var range = sheet.getRange(3, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  
}

function gridLookup(locIn, dateIn) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var thisSheet = ss.getActiveSheet();
  var refSheet = ss.getSheetByName("Labour Grid");

  var thisRange = thisSheet.getDataRange();
  
  //var date = thisRange.getValue(dateIn);
  //var loc = thisRange.getValue(locIn);
  
  
  
  //var dataRange = refSheet.getRange(1, 1, refSheet.getMaxRows(), refSheet.getMaxColumns());
  var refRange = refSheet.getDataRange();
  var values = refRange.getValues();
  
  //var refRange = refSheet.getDataRange();
  
  //var values = refRange.getValues();
  
  var filtered = values.filter(function (dataRow) {
    return dataRow[0] === dateIn && dataRow[1] === locIn;
  });
  
  
  
  return filtered
  
  
 // var date = thisSheet.getRange(dateIn).getValue();
  
 // var loc = thisSheet.getRange(locIn).getValue();
  
  

  //return locIn + dateIn
  
}

function dateFormat(dates) {
  
  if (dates.length == 0) {
  return -1
 
  } 
  
  if (dates.length == 1) {
  
    var dF = Utilities.formatDate(dates[0], "EST", 'EEE, MMM d')
    
    return dF
    
  } else {
   var dFStart = Utilities.formatDate(dates[0], "EST", 'EEE, MMM d')
    var dFEnd = Utilities.formatDate(dates[dates.length -1], "EST", 'EEE, MMM d')
    var dF = dFStart + " - " + dFEnd;    
    return dF; 
  }
}

function testFunc() {
    Logger.log("hello");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("LocationGrid");
  
var locDates = GETDATES(sheet, "ASW Steel, Welland On");
  
  
  
    Logger.log(dateFormat(locDates.prepDates));  
  Logger.log(dateFormat(locDates.shootDates));

    Logger.log(dateFormat(locDates.wrapDates));
  
}

function findRowByValue(sheet, value) {
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {     
      if (values[i][j] == value) {
        //Logger.log(i);
        return i+1;
      }
    }    
   }
  return -1;
}

/*
function findRowByValue(sheet, value) {
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {     
      if (values[i][j] == value) {
        //Logger.log(i);
        return i+1;
      }
    }    
   }
  return -1;
}


  

    //Logger.log(loc);
  
  //TODO: Error checking on null date
  
  if (!activityDates) {
    
  } else {
    
  
    Logger.log(activityDates);
    var dF = dateFormat(activityDates)
    
    if (dF !== -1) {
      
      return dF;
    } else {
      var responseMsg = 'no ' + activity;
      return responseMsg
    }
  } 
}
*/


function GETDATES(item, activity) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Shooting Schedule");
  
  var loc = {
 
     prepDates: [],
     shootDates: [],
     wrapDates: []
  }
   
   var activityDates = [];
  
  
  var itemRow = findRowByValue(sheet, item);
  
  var range = sheet.getRange(itemRow, 1, 1, sheet.getMaxColumns());
  var dateRange = sheet.getRange(4, 1, 1, sheet.getMaxColumns());
  //sheet.setActiveRange(range);
  var Tvalues = range.getValues();
    
  var TdateValues = dateRange.getValues();
  
  var values = Tvalues[0];
  var dateValues = TdateValues[0];  
  
  //Logger.log(values.length);
  //Logger.log(dateValues.length);
    
  //Logger.log(dateValues);
 
  for (var i = 0; i < values.length; i++) {      
    
    //Logger.log(values[i]+"\n");// + " " + dateValues[i]);
    
    if (values[i] === activity) {
      activityDates.push(dateValues[i]);
    } 
    
    
    /*
    if (values[i] === "RIG") {
      loc.prepDates.push(dateValues[i]);
    }  
      if (values[i] === "SHOOT") {
              //Logger.log("YES");
         loc.shootDates.push(dateValues[i]);
      }     
    if (values[i] === "DE-RIG") {
         loc.wrapDates.push(dateValues[i]);
      }     
*/
}     
  

    //Logger.log(loc);
  
  //TODO: Error checking on null date
  
  if (!activityDates) {
    
  } else {
    
  
    Logger.log(activityDates);
    var dF = dateFormat(activityDates)
    
    if (dF !== -1) {
      
      return dF;
    } else {
      var responseMsg = 'no ' + activity;
      return responseMsg
    }
  } 
}

function getRowByKey(sheetName, key, col, lastItem) {//, retCol, lastItem) {
  
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  var range = sheet.getRange(1, col, sheet.getMaxRows(), 1).getValues();
  
  var result = [];
  
 
  for ( var i=0; i < range.length; i++) {
    if (range[i] == key) {
      result.push(i + 1)
      //return i+1
    }
  
  }
  
  if (!!lastItem) {
  
    //return "true"
    //if (
    return result[result.length -1]
  } else {
   return result[0]
    
   // return
  }
 
}






function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("LocationGrid");
  //var ssNew = SpreadsheetApp.create(date);
  
  //var range = sheet.getRange(startRange)

  var Avals = sheet.getRange("A4:A").getValues();
  var Alast = Avals.filter(String).length;

  var template = ss.getSheetByName('Template');



  
  for ( var i=0; i < Avals.length; i++) {
    
   
    var Location = Avals[i];
    
    //var itemRow = findRowByValue(sheet, Location);
    
   // var locDates = getDates(sheet, Location);
    
    
    
    
    //Logger.log(Location);
    
    // get the sheets to check you are not creating a duplicate sheet 
    var sheets = ss.getSheets();
   
    template.copyTo(ss).setName(Location).getRange('B1').setValue(Location);

                
  }
}






function rowOfItem(item) {
  
  var sheet = SpreadsheetApp.getActiveSheet().getSheetByName("Location Grid");
  var range = sheet.getRange(startRange)
  //var prepStart = new.Date();

  var startColumn = range.getColumn();
  var startRow = range.getRow();

  var rowNum = 0
  
  for (var row_num = startRow; row_num < startRow+128;  row_num++) {

    var data = Range.getCell(row_num, 0);
    
   
    
    
    //var cellWithPipe = sheet.getRange(row_num, startColumn-1).getValue();
    //var cellValue = sheet.getRange(row_num, startColumn).getValue();

    if (data === item) {
      rowNum = row_num 
    } 
  return rowNum;
  }
}

function colReturn(sheetName, item, rRow, getLast) {
  
  var sheet = SpreadsheetApp.getActiveSheet().getSheetByName(sheetName);;
  var range = sheet.getRange(startRange)
  //var prepStart = new.Date();

  var startColumn = range.getColumn();
  var startRow = range.getRow();

  
  
}


function colOfItem(sheetName, item, rRow) {
  
  var sheet = SpreadsheetApp.getActiveSheet().getSheetByName("Location Grid");;
  var range = sheet.getRange(startRange)
  //var prepStart = new.Date();

  var startColumn = range.getColumn();
  var startRow = range.getRow();

  var locObj = {
    location: item,
    prep_dates: [],
    shoot_dates: [],
    wrap_dates: []
  }
  
 // var rowNum = 0
  
  for (var col_num = startCol; col_num < startCol+128;  col_num++) {

    var data = Range.getCell(rRow, col_num);
    
   
    var thisColDate = Range.getCell(3, col_num);
    
    
    
    //var cellWithPipe = sheet.getRange(row_num, startColumn-1).getValue();
    //var cellValue = sheet.getRange(row_num, startColumn).getValue();

    if (data === "PREP") {
      locObj.prep_dates.push(thisColDate)
    } 
       
    if (data === "SHOOT") {
      locObj.shoot_dates.push(thisColDate)
    } 
    
    if (data === "WRAP") {
      locObj.wrap_dates.push(thisColDate)
    } 
  }
  return locObj;
}

