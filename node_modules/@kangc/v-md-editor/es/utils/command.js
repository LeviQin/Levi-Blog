import { importAll } from "./util";
var defaultCommands = {};
importAll(defaultCommands, require.context('@/command', false, /\.(js)$/));
export default function registerCommand(target, commandName, callback) {
  if (commandName) {
    if (!target[commandName]) {
      target[commandName] = callback;
    } else {
      console.error("The command name is already in use: " + commandName);
    }
  } else {
    console.error('Command name is required');
  }
}
export function commandWrapper(component) {
  component.commands = {};

  component.command = function (commandName, callback) {
    registerCommand(component.commands, commandName, callback);
  };

  Object.keys(defaultCommands).forEach(function (key) {
    var module = defaultCommands[key];
    var name = module.name,
        callback = module.default;
    component.command(name, callback);
  });
}