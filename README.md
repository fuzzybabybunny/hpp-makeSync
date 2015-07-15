makeSync
=========================

One of Meteor's `.wrapAsync()` issues is that it only returns a generic `Internal Server Error` when there is an error with your asychronous function call. Usually we want to receive a specific, descriptive error in order to handle it properly.  

User @faceyspacey wrote a function that he called `makeAsync`. I've changed the name to `makeSync` since his code is taking an asynchronous function and allowing you to use it in a synchronous style. His code modifies the original `Meteor.wrapAsync()` code to return an actual error object.

### Full attribution for this original code goes to @faceyspacey

### Install

`meteor add hpp:makeSync`

### How it Works

`makeSync` does the same thing as Meteor's `wrapAsync`, only it returns the following object:

```javascript
{error: error, data: data}
```

The value of `error` is the actual error returned by the external API or asychronous function. If the value of `error` is `null`, the value of `data` will be the data returned by the external API or asychronous function.

`makeSync`, like `wrapAsync`, works only on the server since the client doesn't have `fibers/future`.

### Example

The following code makes an asychronous call to zippopotam.us to retrieve the location info of a United States Zip Code.

`/server/methods.js`

```javascript

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

```

Now when we do 

```javascript
Meteor.call("getLocationWithWrap", "94043", function(error, result){
  if(error){
    console.log("here is the error: ", error)
  } else {
    console.log("success: ", result);
  }
});
```

You get the actual error returned from the external API or the error-less result.

### Contributing

Feel free to make pull requests. 