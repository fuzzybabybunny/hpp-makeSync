// This is the asynchronous function that we define

var getLocationAsync = function(zipcode, callback){

  // be sure to add the http package in Meteor

  HTTP.call("GET", "http://api.zippopotam.us/us/" + zipcode, function(error, result) {
    callback(error,result);
  });

};

// We 'make' our previous function into a synchronous one here

var getLocationWithMakeSync = Meteor.makeSync(getLocationAsync);

Meteor.methods({

  getLocationWithMakeSync: function(zipcode){

    // remember that result will be an object - {error:  error, data: data}

    var result = getLocationWithMakeSync(zipcode);

    if( result.error === null ){
      // no error
      return result.data;
    } else {
      // handle the particular error
      throw new Meteor.Error(result.error);
    };

  },

});

var goodZip = "94043";
var badZip = "940";

Meteor.call("getLocationWithWrap", goodZip, function(error, result){
  if(error){
    console.log("here is the error: ", error)
  } else {
    console.log("success from " + goodzip ": ", result);
  }
});

Meteor.call("getLocationWithWrap", badZip, function(error, result){
  if(error){
    console.log("here is the error from " + badZip + ": ", error)
  } else {
    console.log("success: ", result);
  }
});