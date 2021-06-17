function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var TableComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TableComponent, _Component);

  function TableComponent(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.keys = _this.props.keys ? _this.props.keys : Object.keys(_this.props.data[0]);
    _this.pages = typeof _this.props.pages === 'number' ? _this.props.pages : 0;
    return _this;
  }

  var _proto = TableComponent.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.keys !== this.props.keys) {
      this.keys = this.props.keys ? this.props.keys : Object.keys(this.props.data[0]);
    }

    if (prevProps.pages !== this.props.pages) {
      this.pages = typeof this.props.pages === 'number' ? this.props.pages : 0;
    }
  };

  _proto.handleCellClick = function handleCellClick(row, column, value, target) {
    var payload = {
      row: row,
      column: column,
      value: value,
      target: target
    };

    if (this.props.onCellClick) {
      this.props.onCellClick(payload);
    }

    return payload;
  };

  _proto.handlePageClick = function handlePageClick(page) {
    if (this.props.onPageClick) {
      this.props.onPageClick(page);
    }
  };

  _proto.handleNextPageClick = function handleNextPageClick() {
    if (this.props.onNextPageClick) {
      this.props.onNextPageClick();
    }
  };

  _proto.handlePreviousPageClick = function handlePreviousPageClick() {
    if (this.props.onPreviousPageClick) {
      this.props.onPreviousPageClick();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("table", {
      className: this.props.className,
      style: this.props.style
    }, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, this.keys.map(function (key, index) {
      return /*#__PURE__*/React__default.createElement("th", {
        onClick: function onClick(e) {
          return _this2.handleCellClick(0, index, key, e.target);
        },
        key: index,
        scope: "col"
      }, key);
    }))), /*#__PURE__*/React__default.createElement("tbody", null, this.props.data.map(function (val) {
      return Object.values(val);
    }).map(function (row, rIndex) {
      return /*#__PURE__*/React__default.createElement("tr", {
        key: rIndex
      }, row.map(function (cell, cIndex) {
        return /*#__PURE__*/React__default.createElement("td", {
          onClick: function onClick(e) {
            return _this2.handleCellClick(rIndex, cIndex, cell, e.target);
          },
          key: cIndex
        }, cell);
      }));
    }))), this.props.pagination ? /*#__PURE__*/React__default.createElement("ul", {
      className: "pagination"
    }, this.props.showPrevious ? /*#__PURE__*/React__default.createElement("li", {
      className: "page-item"
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return _this2.handlePreviousPageClick();
      },
      className: "btn btn-link"
    }, "<")) : '', [].concat(new Array(this.pages)).map(function (_, index) {
      return /*#__PURE__*/React__default.createElement("li", {
        className: "page-item",
        key: index
      }, /*#__PURE__*/React__default.createElement("button", {
        onClick: function onClick() {
          return _this2.handlePageClick(index + 1);
        },
        className: "btn btn-link"
      }, index + 1));
    }), this.props.showNext ? /*#__PURE__*/React__default.createElement("li", {
      className: "page-item"
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return _this2.handleNextPageClick();
      },
      className: "btn btn-link"
    }, ">")) : '') : '');
  };

  return TableComponent;
}(React.Component);

exports.TableComponent = TableComponent;
//# sourceMappingURL=index.js.map
