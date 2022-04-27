"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var zero = R.always(0);
var getTop = R.pathOr(0, ['box', 'top']);
var hasFixedHeight = R.hasPath(['style', 'height']);

var subtractHeight = function subtractHeight(value) {
  return R.o(R.subtract(R.__, value), R.path(['box', 'height']));
};

var splitNode = function splitNode(node, height) {
  if (!node) return [null, null];
  var nodeTop = getTop(node); // TODO: We should keep style untouched

  var current = R.evolve({
    style: R.evolve({
      marginBottom: zero,
      paddingBottom: zero,
      borderBottomWidth: zero,
      borderBottomLeftRadius: zero,
      borderBottomRightRadius: zero
    }),
    box: {
      borderBottomWidth: zero
    }
  })(node); // TODO: force height without style mutation

  current.style.height = height - nodeTop;
  var nextHeight = R.ifElse(hasFixedHeight, subtractHeight(height - nodeTop), R.always(null))(node); // TODO: We should keep style untouched

  var next = R.evolve({
    style: R.evolve({
      marginTop: zero,
      paddingTop: zero,
      borderTopWidth: zero,
      borderTopLeftRadius: zero,
      borderTopRightRadius: zero
    }),
    box: {
      top: zero,
      borderTopWidth: zero
    }
  })(node); // TODO: force height without style mutation

  if (nextHeight) {
    next.style.height = nextHeight;
  }

  return [current, next];
};

var _default = splitNode;
exports.default = _default;