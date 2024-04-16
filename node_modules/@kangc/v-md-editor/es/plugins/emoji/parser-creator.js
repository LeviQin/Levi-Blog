export default function parserCreator(mdEmojiPlugin) {
  return function (vMdParser, options) {
    if (options === void 0) {
      options = {};
    }

    vMdParser.extendMarkdown(function (mdParser) {
      // extend markdown-it
      mdParser.use(mdEmojiPlugin);

      if (options.customEmoji) {
        mdParser.renderer.rules.emoji = function (token, idx) {
          return '<span class="v-md-emoji emoji-' + token[idx].markup + '"></span>';
        };
      }
    });
  };
}