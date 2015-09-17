/**
 * Register settings options and implementations for a class, and later configure any instance.
 *
 * @class SettingsGroup
 */
function SettingsGroup() {
  this.options = {};
}

/**
 * Add an option for this settings group.
 *
 * @param name    {String}   Name of the option.
 * @param setFunc {Function} Configures the setting in an object.
 * @param values  {Array}    Accepted values for this option (optional--not implemented).
 * @param default {*}        Value to choose if no option is present (optional--not implemented).
 */
SettingsGroup.prototype.registerOption = function (name, setFunc, values, defaultValue) {
  this.options[name] = {
    setFunc: setFunc,
    values: values,
    defaultValue: defaultValue
  };
};

/**
 * Configure an object with the supplied settings.
 * Runs the setFunc for each option applied to the object, passing the selected option value in.
 *
 * @param object     {Object} The object to configure.
 * @param optionsMap {Object} A map of optionName: value pairs.
 */
SettingsGroup.prototype.configure = function (object, optionsMap) {
  var option, value;
  for (option in optionsMap) {
    value = optionsMap[option];
    this.options[option].setFunc.call(object, value);
  }
};

/**
 * A registry of named SettingsGroup instances across the entire app.
 * This way, we have a single source for all the choice points in the app's configuration.
 *
 * @class Settings
 */
function Settings() {
  this.settings = {};
}

/**
 * Register a group (could be a package) and its settings.
 *
 * @param name {String} The name of the group to register with Settings instance.
 * @return The instance of SettingsGroup assigned to this group.
 */
Settings.prototype.createGroup(name) {
  this.settings[name] = new SettingsGroup;
  return this.settings[name];
}

/**
 * Exports.
 */
settings = {
  create: function () {
    return new Settings;
  }
};

