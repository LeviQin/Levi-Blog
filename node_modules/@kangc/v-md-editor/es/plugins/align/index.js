import parser from "./parser";
export default function () {
  return {
    install: function install(VMdEditor) {
      VMdEditor.vMdParser.use(parser);
    }
  };
}