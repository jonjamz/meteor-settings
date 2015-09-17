# settings

A minimalistic API that formalizes the way settings are implemented across third-party libraries
and custom modules in an application.

### Install

Note: this package is currently in a very early, untested state. 

`$ meteor add jamz:settings`

### How to Use

Create a new instance of Settings class available to the whole application:
```js
// At the app level:
App.settings = settings.create();

```

Add configuration options for a third-party library to a Settings Group.
```js

// Say we have a package called GoogleMap that implements settings with the Settings class.
var GoogleMapSettings = App.settings.createGroup('google-maps');

// It has an option to set the size.
GoogleMapSettings.registerOption('size', function (size) {
  this.setMapSize(size);
});

```

Configure the third-party library with a simple configuration object.
```js
// Now we create a new map and configure it.
var map = new GoogleMap();

// Wrap this in Tracker.autorun to reconfigure map when screen size changes, a different user
// logs in, etc. depending on what dependencies you track.
GoogleMapSettings.configure(map, {size: {width: 640, height: 480}});
```

### Coming Soon

* Specify a default configuration value.
* Limit the allowed configuration values according to a schema.