import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _memoize from "lodash/memoize";
import _invoke from "lodash/invoke";
import { isRefObject } from '../../../lib/refUtils';

var CreateReferenceProxy =
/*#__PURE__*/
function () {
  function CreateReferenceProxy(refObject) {
    _classCallCheck(this, CreateReferenceProxy);

    this.ref = refObject;
  }

  _createClass(CreateReferenceProxy, [{
    key: "getBoundingClientRect",
    value: function getBoundingClientRect() {
      return _invoke(this.ref.current, 'getBoundingClientRect', {});
    }
  }, {
    key: "clientWidth",
    get: function get() {
      return this.getBoundingClientRect().width;
    }
  }, {
    key: "clientHeight",
    get: function get() {
      return this.getBoundingClientRect().height;
    }
  }]);

  return CreateReferenceProxy;
}();
/**
 * Popper.js does not support ref objects from `createRef()` as referenceElement. If we will pass
 * directly `ref`, `ref.current` will be `null` at the render process. We use memoize to keep the
 * same reference between renders.
 *
 * @see https://popper.js.org/popper-documentation.html#referenceObject
 */


var createReferenceProxy = _memoize(function (reference) {
  return new CreateReferenceProxy( // TODO: use toRefObject from Stardust
  // https://github.com/stardust-ui/react/issues/998
  isRefObject(reference) ? reference : {
    current: reference
  });
});

export default createReferenceProxy;