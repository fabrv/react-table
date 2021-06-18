import React, { Component } from 'react';

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.filterValues = {};
    this.state = {
      sortValues: {}
    };
    this.columns = this.columnsObject(this.props.columns, this.props.data);
    this.pages = typeof this.props.pages === 'number' ? this.props.pages : 0;
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns !== this.props.columns) {
      this.columns = this.columnsObject(this.props.columns, this.props.data);
    }

    if (prevProps.pages !== this.props.pages) {
      this.pages = typeof this.props.pages === 'number' ? this.props.pages : 0;
    }
  }

  columnsObject(prop, data) {
    const obj = prop || Object.keys(data[0]);

    if (typeof obj[0] === 'string') {
      return obj.map(column => ({
        caption: column,
        filterComponent: null
      }));
    } else {
      return obj;
    }
  }

  handleCellClick(row, column, value, target) {
    const payload = {
      row: row,
      column: column,
      value: value,
      target: target
    };

    if (this.props.onCellClick) {
      this.props.onCellClick(payload);
    }
  }

  handlePageClick(page) {
    if (this.props.onPageClick) {
      this.props.onPageClick(page);
    }
  }

  handleNextPageClick() {
    if (this.props.onNextPageClick) {
      this.props.onNextPageClick();
    }
  }

  handlePreviousPageClick() {
    if (this.props.onPreviousPageClick) {
      this.props.onPreviousPageClick();
    }
  }

  handleFilter(value, id) {
    this.filterValues[id] = {
      value: value
    };

    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.filterValues);
    }
  }

  handleSort(id) {
    var _this$state$sortValue;

    const val = (_this$state$sortValue = this.state.sortValues[id]) === null || _this$state$sortValue === void 0 ? void 0 : _this$state$sortValue.value;
    const sortValue = {};
    sortValue[id] = {
      value: val ? (val + 1) % 3 : 1
    };
    this.setState({
      sortValues: sortValue
    });

    if (this.props.onSortChange) {
      this.props.onSortChange(sortValue);
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
      className: this.props.className,
      style: this.props.style
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, this.columns.map((column, index) => {
      var _this$state$sortValue2, _this$state$sortValue3;

      return /*#__PURE__*/React.createElement("th", {
        onClick: e => {
          this.handleCellClick(0, index, column.caption, e.target);
        },
        key: index,
        scope: "col"
      }, /*#__PURE__*/React.createElement("span", {
        onClick: _ => {
          if (column.sortable) this.handleSort(column.id);
        },
        style: column.sortable ? {
          cursor: 'pointer'
        } : null
      }, column.caption), ((_this$state$sortValue2 = this.state.sortValues[column.id]) === null || _this$state$sortValue2 === void 0 ? void 0 : _this$state$sortValue2.value) === 1 ? ' ▴' : null, ((_this$state$sortValue3 = this.state.sortValues[column.id]) === null || _this$state$sortValue3 === void 0 ? void 0 : _this$state$sortValue3.value) === 2 ? ' ▾' : null, column.filterComponent ? /*#__PURE__*/React.createElement(column.filterComponent, {
        setFilter: value => {
          this.handleFilter(value, column.id || 'search');
        }
      }) : null);
    }))), /*#__PURE__*/React.createElement("tbody", null, this.props.data.map(val => Object.values(val)).map((row, rIndex) => /*#__PURE__*/React.createElement("tr", {
      key: rIndex
    }, row.map((cell, cIndex) => /*#__PURE__*/React.createElement("td", {
      onClick: e => this.handleCellClick(rIndex, cIndex, cell, e.target),
      key: cIndex
    }, cell)))))), this.props.pagination ? /*#__PURE__*/React.createElement("ul", {
      className: "pagination"
    }, this.props.showPrevious ? /*#__PURE__*/React.createElement("li", {
      className: "page-item"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handlePreviousPageClick(),
      className: "btn btn-link"
    }, "<")) : '', [...new Array(this.pages)].map((_, index) => /*#__PURE__*/React.createElement("li", {
      className: "page-item",
      key: index
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handlePageClick(index + 1),
      className: "btn btn-link"
    }, index + 1))), this.props.showNext ? /*#__PURE__*/React.createElement("li", {
      className: "page-item"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleNextPageClick(),
      className: "btn btn-link"
    }, ">")) : '') : '');
  }

}

export { TableComponent };
//# sourceMappingURL=index.modern.js.map
