//breakdown.gs

function getLabourArray() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Labour Grid");
 
  var headerRows = 2;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange(); // determine the range of populated data
  var numRows = range.getNumRows(); // get the number of rows in the range
  var data = range.getValues(); // get the actual data in an array data[row][column]
  
  var byUnit = {}
  var byDate = {}
  var byTeam = {}
  var byLocation = {}
  
  var labourObj = []
  
  for (var i=headerRows; i < data.length; i++) {
  
    var thisObj = {};
    var thisRow = data[i].slice(0)
    
    var thisDate = thisRow.slice(0,1).shift();
    var thisLoc = thisRow.slice(1,2).shift(); 
    var thisActivity = thisRow.slice(2,3).shift();
    var thisUnit = thisRow.slice(3,4).shift();
    var thisUnitQty = thisRow.slice(4,5).shift();
    var thisTeam = thisRow.slice(5,6).shift();
    var thisRate = thisRow.slice(6,7).shift();
    var thisBudgetCode = thisRow.slice(7,8).shift();
    var thisDZDriver = thisRow.slice(8,9).shift();
    var thisShuttleDriver = thisRow.slice(9,10).shift();  
    
    var refDate1 = new Date(thisDate)
      
    var refDate = Date.UTC(refDate1.getFullYear(), refDate1.getMonth(), refDate1.getDate());
    
    
    
    //var byTeamObj ={}
  
    /*
    var labourObj = {
      unit: thisUnit,
      qty: thisUnitQty,
      dz_driver: thisDZDriver,
      shuttle_driver: thisShuttleDriver
    }
    */
    
    
    
    thisObj = {
    
      date: thisDate,
      date_utc: refDate,
      location: thisLoc,
      team: thisTeam,
      activity: thisActivity,
      rate: thisRate,
      unit: thisUnit,
      qty: thisUnitQty,
      dz_driver: thisDZDriver,        
      shuttle_driver: thisShuttleDriver,
      budget_code: thisBudgetCode
    
    
    }
    
    
    
      
    labourObj.push(thisObj)
    
    
  }
  
  return labourObj

}

function genShootSched() {
 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Shooting Schedule");
 
  var headerRows = 4;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange(); // determine the range of populated data
  var numRows = range.getNumRows(); // get the number of rows in the range
  var data = range.getValues(); // get the actual data in an array data[row][column]
  
  
  var sched = getSchedObjByDate();
  
  
  //data[10][10] = "SHOOT"
  
  //var values = [];
  
  //var values2 = []
  
  Logger.log("data length: ", data.length)
  //data[10][10] = "SHOOT"
  
  //range.setValues(data)
  
  //range.setV
  
  //return
  
  //return JSON.stringify(sched)
  
  var dateRow = data[3].slice(0)
  
  //Logger.log(JSON.stringify(sched))
  
  for (var i=headerRows; i < data.length; i++) {
  
    var thisRow = data[i].slice(0)
    Logger.log("Location ", thisRow[0])
    
    //Logger.log("thisRow length: ", thisRow.length)
    
    for (var j=6; j < thisRow.length; j++) {
    
      
      
      
      try {
      
        Logger.log(dateRow[j])
        
      var refDate1 = new Date(dateRow[j])
      
      var refDate = Date.UTC(refDate1.getFullYear(), refDate1.getMonth(), refDate1.getDate());
      
      Logger.log(JSON.stringify(refDate))
      
            
      
      //var cell = sheet.getRange(i,j);
      if (!!sched[refDate] && sched[refDate].location && sched[refDate].location == thisRow[0]) {
      
        
        data[i][j] = "SHOOT";
      
        Logger.log("Success", i,j,refDate)
        
        
      } //else {data[i][j] = "";}
    
      } catch(err) {
        
        Logger.log(err)
        Logger.log("NO")
        
        }
    }
     
    //return JSON.stringify(thisRow)
  
   
  }

  
  range.setValues(data);
  
  Logger.log(JSON.stringify(data));
  //return
  
}



function getDatesArray(item, activity) {
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
  
  
  return JSON.stringify(activityDates)
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



function findActivity(dateReq, locReq) {
//  var ss = SpreadsheetApp.getActiveSpreadsheet();
//  var sheet = ss.getSheetByName("Datarefs");
//  var data = sheet.getRange("B2").getValue()
  
  
  var thisDay = getSchedObj() //JSON.parse(data)//getSchedObj()

 // return JSON.stringify(data)


 var lookupDate = new Date(dateReq)


 for (var i=0; i < thisDay.length; i++) {


    var refDate = new Date(thisDay[i].date)
    
    if (locReq == thisDay[i].location && lookupDate.getDate() == refDate.getDate() && lookupDate.getMonth() == refDate.getMonth()) {
    
      return "SHOOT"
    
    }
   //JSON.stringify(thisDay)

  


 } 
  return
  
}

function getAddressArray(obj) {

  var retTry = {}
  var retObj = []
  for (var i =0; i< obj.length; i++) {
    
    retTry[obj[i].address] = {}
    retObj.push(obj[i].address)
    }
 
  
    return Object.keys(retTry)
}


function getLocationsArray(obj) {

  var retTry = {}
  var retObj = []
  for (var i =0; i< obj.length; i++) {
    
    retTry[obj[i].location] = {}
    retObj.push(obj[i].location)
    }
 
  
    return Object.keys(retTry)
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function popDateRange() {
 const oneDay = 1000 * 60 * 60 * 24;
  var sched = getSchedObj();
  
  var datesArray = getDatesArray(sched)
  var StartDate = new Date(datesArray.slice(0,1).shift())
  var EndDate = new Date(datesArray.slice(datesArray.length -1,datesArray.length).shift())

  const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
  const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());
 
  var dayOfWeek = StartDate.getDay()
 
  var beginRange = addDays(StartDate, (0 - dayOfWeek))
  
  dayOfWeek = EndDate.getDay()
  
  var endRange = addDays(EndDate, (7 - dayOfWeek))
    
  var j = 1
  
  var totalDays = (endRange - beginRange) / oneDay
  
  var nextDay = addDays(StartDate, 1)
  
  var fullDateArray = [];
  
  for (var i =0; i < totalDays; i++) {
  
    fullDateArray.push(addDays(beginRange, i))
    
  }

  return fullDateArray;
}


function getDatesArray(obj) {

  var retTry = {}
  var retObj = []
  for (var i =0; i< obj.length; i++) {
    
    retTry[obj[i].date] = {}
    retObj.push(obj[i].date)
    }

  var uniqueArray = retObj.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
})
  
  var uDates = Object.keys(retTry)
  
  var uDatesFormatted = []
  
  for (var j=0; j < uDates.length; j++) {
    
    if (!!uDates[j]) {
    var thisDate = new Date(uDates[j]) 
    
    uDatesFormatted.push(thisDate)
    
      }
  }
  
  return uDatesFormatted
}



function shootDayLookup(cell) {

  var lookupDate = new Date(cell)
  
  var sched = getSchedObj();
  
 var dayArray = []
  
  for (var i = 0; i < sched.length; i++) {
    
    if (!!sched[i] && !!sched[i].shoot_day) {
    
    var thisDate = new Date(sched[i].date)
    
    if (thisDate.getDate() == lookupDate.getDate() && thisDate.getMonth() == lookupDate.getMonth() ) {
     
      if (dayArray.length > 0 && sched[i].shoot_day !== sched[i-1].shoot_day) { //dayArray.slice(dayArray.length -1,dayArray.length)) {
      
      
        dayArray.push(sched[i].shoot_day)
      }
       
      if (dayArray.length == 0) {
      
      
        dayArray.push(sched[i].shoot_day)
      }
    }
   
    }
  } 
  
  var retTxt = ""
 
  for (var j = 0; j < dayArray.length; j++) {
 

    retTxt += dayArray[j]
    
    if (j < (dayArray.length - 1)) {
    
      retTxt += ", "
    }
    
  }
  
  return retTxt

}


function getSchedObj(dateReq, locReq) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("schedule");

  var headerRows = 2;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange(); // determine the range of populated data
  var numRows = range.getNumRows(); // get the number of rows in the range
  var data = range.getValues(); // get the actual data in an array data[row][column]

  //return JSON.stringify(data)

  //var lookup = {} 

  var sched = [];
  
  
  for (var i=headerRows; i < data.length; i++) {
  
    var thisRow = data[i].slice(0)
    
    var shootDay = thisRow.slice(0,1).shift();
    var thisDate = thisRow.slice(1,2).shift(); 
    var thisLoc = thisRow.slice(2,3).shift();
    var thisAddress = thisRow.slice(3,4).shift();
    var thisApproxCall = thisRow.slice(4,5).shift();
    var thisScriptLoc = thisRow.slice(5,6).shift();
    var thisScenes = thisRow.slice(6,7).shift();
    var this2uSplinter = thisRow.slice(7,8).shift();
    
    
    var thisObj = {
      shoot_day: shootDay,
      date: thisDate,
      location: thisLoc,
      address: thisAddress,
      approx_call: thisApproxCall,
      script_location: thisScriptLoc,
      scenes: thisScenes
     
    }
   
    
    
    if (!!dateReq && !!locReq) {
    
    var lookupDate = new Date(dateReq)
    var refDate = new Date(thisDate)
    
    if (locReq == thisLoc && lookupDate.getDate() == refDate.getDate() && lookupDate.getMonth() == refDate.getMonth()) {
    
    return thisObj
    }
    
    
    }
    
    
    sched.push(thisObj)
    
  }

  return sched
}


function getSchedObjByDate(dateReq, locReq) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("schedule");

  var headerRows = 2;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange(); // determine the range of populated data
  var numRows = range.getNumRows(); // get the number of rows in the range
  var data = range.getValues(); // get the actual data in an array data[row][column]

  //return JSON.stringify(data)

  //var lookup = {} 

  var sched = [];
   var thisObj = {}
  
  for (var i=headerRows; i < data.length; i++) {
  
    var thisRow = data[i].slice(0)
    
    var shootDay = thisRow.slice(0,1).shift();
    var thisDate = thisRow.slice(1,2).shift(); 
    var thisLoc = thisRow.slice(2,3).shift();
    var thisAddress = thisRow.slice(3,4).shift();
    var thisApproxCall = thisRow.slice(4,5).shift();
    var thisScriptLoc = thisRow.slice(5,6).shift();
    var thisScenes = thisRow.slice(6,7).shift();
    var this2uSplinter = thisRow.slice(7,8).shift();
    
    
   
    
    var tempDate = new Date(thisDate)
     var thisDateAsDate = Date.UTC(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
    
    //sched.push(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())
    //sched.push(tempDate)
   // sched.push(thisDateAsDate)
    
    thisObj[thisDateAsDate] = {
      shoot_day: shootDay,
      date: thisDate,
      location: thisLoc,
      address: thisAddress,
      approx_call: thisApproxCall,
      script_location: thisScriptLoc,
      scenes: thisScenes
     
    }
   
    
    
    if (!!dateReq && !!locReq) {
    
    var lookupDate = new Date(dateReq)
    var refDate = new Date(thisDate)
    
    if (locReq == thisLoc && lookupDate.getDate() == refDate.getDate() && lookupDate.getMonth() == refDate.getMonth()) {
    
    return thisObj
    }
    
    
    }
    
    
    //sched.push(thisObj)
    
  }

  return thisObj
}




function testReturn(location) {

  //var test = [["0","1","2"],["1","1","2"]]
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = ss.getRange(24, 2, 2, 3);

  var data = testLocReport(location)
  
  range.setValues(data);
}


function testLocReport(location, range) {
  var labour = buildLabourObjs(location)

//  var 
  
  var activities = Object.keys(labour[location]);
//activities

  //return JSON.stringify(activities)
  
  var actList = []
  var test = []


  //test.push(activities[0]);
  //test.push(activities[1]);

  //return JSON.stringify(test);
  
  for (var i=0; i < activities.length; i++) {
    //actList.push(Object.keys(labour[location][activities[i]]))
    //return activities[i]
    
    //return activities.length
    var thisActivity = labour[location]

    var thisAct = []
    test.push(activities[i])
    
    var thisDates = Object.keys(thisActivity[activities[i]])
    thisAct.push(activities[i]);
    
    for (var j=0; j < thisDates.length; j++) {
      
     var thisDate = new Date(thisDates[j])
      
      thisAct.push(thisDate);
        
    }
    actList.push(thisAct)
    
   // return JSON.stringify(actList)
  }  
  
return actList



}


function getLocInfo(loc, item) {

  var data = buildLocObjs();
  
  /*
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "RawData"
  var sheet = ss.getSheetByName(sheetName);
  var range = sheet.getRange("A2:A2").getCell(1,1).getValue();

  //var data = range.getCell(1,1).getValue()
  var data = JSON.parse(range)
  var toReturn = ""
  */
 // if (item == "Sh
  
  
  
  //return data[loc].Shoot.Dates
  
  
  //if (item == dates
  
  return Object.keys(data)
  
  
  
} 

function buildLabourObjs(req) {//, retCol, lastItem) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetName = "Labour Grid"
  var sheet = ss.getSheetByName(sheetName);
  
  var headerRows = 2;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange(); // determine the range of populated data
  var numRows = range.getNumRows(); // get the number of rows in the range
  var data = range.getValues(); // get the actual data in an array data[row][column]
  
  var locs = buildLocObjs("locs");
  
  var locList = Object.keys(locs)
  
  
  var labour = {};
 
  var testRow = data[2].slice(0)
  var thisLoc = testRow.slice(2,3).shift()
  //var thisLoc = thisLoc1.shift()
  //return JSON.stringify(testRow)
 
  for (var i=headerRows; i<numRows; i++) {
  
    var thisRow = data[i].slice(0)
    
    
    var thisLoc = thisRow.slice(2,3).shift();
    
    if (!req || !!req && req == thisLoc) {
    
    var unitDate = thisRow.slice(1,2).shift();
    var unitActivity = thisRow.slice(3,4).shift();
    
    var unitItem = thisRow.slice(4,5).shift();
    var unitQty = thisRow.slice(5,6).shift();
    var unitSplit = thisRow.slice(6,7).shift();
    var unitCode = thisRow.slice(7,8).shift();
    var unitObj = {};
    
    //var fDate = new Date(unitDate)
      
     unitObj = {
      date: unitDate,
      activity: unitActivity,
      unit: unitItem,
      qty: unitQty,
      code: unitCode,
      split: unitSplit
    }
     
    //return JSON.stringify(unitObj)
    

    
    
     if (!labour[thisLoc]) { 
       labour[thisLoc] = {};
     }
    
    if (!labour[thisLoc][unitActivity]) {
      labour[thisLoc][unitActivity] = {};
    }
    
    
    
    if (!labour[thisLoc][unitActivity][unitDate]) {
      labour[thisLoc][unitActivity][unitDate] = {};
    }
    
    if (!labour[thisLoc][unitActivity][unitDate][unitItem]) {
      labour[thisLoc][unitActivity][unitDate][unitItem] = {};
    }
    
    labour[thisLoc][unitActivity][unitDate][unitItem] = unitObj;    
    
    }
    
  
  
  
  }
  
   //return JSON.stringify(labour);
  return(labour)
}






function buildLocObjs(req) {//, retCol, lastItem) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetName = "Shooting Schedule"
  var sheet = ss.getSheetByName(sheetName);
  
  //getRange(row, column, numRows, numColumns)
  
  var range = sheet.getRange(3, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();
  var locs = sheet.getRange(5, 1, sheet.getMaxRows(), 1).getValues()
   
  
  var dayRow1 = sheet.getRange("A3:AO3").getValues();
  var dateRow1 = sheet.getRange("A4:AO4").getValues();

  var dayRow = dayRow1[0].slice(0)
  var dateRow = dateRow1[0].slice(0)
    
  var locations = {};
    
  var shootDays = {};
  
  for (var i = 0; i < locs.length; i++) {
    
    var thisRow1 = sheet.getRange(i+5, 1, 1, sheet.getMaxColumns()).getValues()
   
    var thisRow = thisRow1[0].slice(0)
  
   var locName1 = locs[i].slice(0,1);
   
   var locName = locName1.shift();
   
    
    
    var shootDates = []//{}
    
  
    var thisLoc = {
      Name: locName,
      Shoot: {
        Days: [],
        Dates: []
      },
      Rain: {
        Days: [],
        Dates: []
      }           
    }
    
      for (var j = 1; j < thisRow.length; j++) {
      var shootDay = parseInt(dayRow[j])
      if (thisRow[j] == "SHOOT" || thisRow[j] == "RAIN") {       

        shootDays[shootDay] = {
                date: dateRow[j],
                shootLocations: [],
                rainLocations: []
              }
      }
      
     
        if (thisRow[j] == "SHOOT") { 
              thisLoc.Shoot.Dates.push(dateRow[j]);
              thisLoc.Shoot.Days.push(dayRow[j]);
           
            shootDays[shootDay].shootLocations.push(locName)
              
            }
           
        if (thisRow[j] == "RAIN") { 
              thisLoc.Rain.Dates.push(dateRow[j]);
              thisLoc.Rain.Days.push(dayRow[j]);
              shootDays[shootDay].rainLocations.push(locName)
            }         
    }   
    
  locations[locName] = thisLoc  
    
  }

  var locsReturn = JSON.stringify(locations)
  var daysReturn = JSON.stringify(shootDays)
  var fullReturn = []
  fullReturn.push("DATA")
  fullReturn.push(locsReturn)
  fullReturn.push(daysReturn)  
  
 // return locsReturn
  if (req == "dates") {
    return shootDays
  }
  if (req == "locs") {
    return locations
  }
  
   
}

