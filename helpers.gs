function genVehiclesGrid() {
  var labourArray = getLabourArray();
  
  var test = labourArray.filter ( function (item) {
    return (!!item.shuttle_driver || !!item.dz_driver); //item.shuttle === byUnit && item.rate === byRate && item.budget_code === budgetCode);
  })
  
   //return JSON.stringify(test)
  var vehicles = []
  
  for (var i = 0; i < vehicles.length; i++) {
  
    
  }
  
}


function genLabourReport(byUnit, byRate, budgetCode) {

  var labourArray = getLabourArray();
  
  var test = labourArray.filter ( function (item) {
    return (!!item.shuttle_driver || !!item.dz_driver); // === byUnit && item.rate === byRate && item.budget_code === budgetCode);
  })
  
  
  
 
  
  //var sumQty = {}
  var sumQty = 0
  
  for (var i = 0; i < test.length; i++) {
  
    //return test[i].rate
    
    /*
    if (!sumQty[test[i].rate]) {
    
      sumQty[test[i].rate] = {
        qty: test[i].qty
      }
    } else {
    
      sumQty[test[i].rate].qty = test[i].qty
      
    }
    */
    sumQty += test[i].qty;
    
  
  }
  
  //return JSON.stringify(sumQty)
  
  return sumQty
  //return JSON.stringify(test)

  
}


function getSchedObjJSON() {
  var sched = getSchedObj();
  return JSON.stringify(sched)
}


function horizDates() {
var dates = popDateRange();

var hDates = arrayToHoriz(dates);

return hDates  
  

}

function arrayToHoriz(array) {

  var hArray = []
  hArray.push(array)
  
  return hArray

}


function getDatesList() {

 var sched = getSchedObj();
    
  var dates = getDatesArray(sched)  
  
  return dates

}


function getAddressList() {

 var sched = getSchedObj();
    
  var locations = getAddressArray(sched)  
  
  return locations

}

function getLocationList() {

 var sched = getSchedObj();
    
  var locations = getLocationsArray(sched)  
  
  return locations

}


function getLabourobjs(req) {

  var data = buildLabourObjs(req);

  return JSON.stringify(data)
  
}

function getShootDays(loc) {

  var data = buildLocObjs("locs");

  return data[loc].Shoot.Days
  
}

function getShootDaysList(loc) {

  var data = buildLocObjs("locs");

  var returnString = ""
  
  for (var i = 0; i < data[loc].Shoot.Days.length; i++) {
  
    returnString += data[loc].Shoot.Days[i] + ", ";
  }
  
  
  return returnString
  
}






function getShootDates(loc) {

  var data = buildLocObjs("locs");

  return data[loc].Shoot.Dates
  
}