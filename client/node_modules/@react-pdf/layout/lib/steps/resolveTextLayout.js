"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _layoutText = _interopRequireDefault(require("../text/layoutText"));

/* eslint-disable no-param-reassign */
var isType = R.propEq('type');
var isSvg = isType(P.Svg);
var isText = isType(P.Text);
var isNotSvg = R.complement(isSvg);
var isNotText = R.complement(isText);

var shouldIterate = function shouldIterate(node) {
  return isNotSvg(node) && isNotText(node);
};

var shouldLayoutText = function shouldLayoutText(node) {
  return isText(node) && !node.lines;
};
/**
 * Performs text layout on text node if wasn't calculated before.
 * Text layout is usually performed on Yoga's layout process (via setMeasureFunc),
 * but we need to layout those nodes with fixed width and height.
 *
 * @param {Object} node
 * @returns {Object} layout node
 */


var resolveTextLayout = function resolveTextLayout(node, fontStore) {
  if (shouldLayoutText(node)) {
    var width = node.box.width - (node.box.paddingRight + node.box.paddingLeft);
    var height = node.box.height - (node.box.paddingTop + node.box.paddingBottom);
    node.lines = (0, _layoutText.default)(node, width, height, fontStore);
  }

  if (shouldIterate(node)) {
    var mapChild = function mapChild(child) {
      return resolveTextLayout(child, fontStore);
    };

    return R.evolve({
      children: R.map(mapChild)
    })(node);
  }

  return node;
};

var _default = resolveTextLayout;
exports.default = _default;