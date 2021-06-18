import React, { Component } from 'react';

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.filterValues = {};
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
    console.log(this.filterValues);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
      className: this.props.className,
      style: this.props.style
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, this.columns.map((column, index) => /*#__PURE__*/React.createElement("th", {
      onClick: e => this.handleCellClick(0, index, column.caption, e.target),
      key: index,
      scope: "col"
    }, column.caption, column.filterComponent ? /*#__PURE__*/React.createElement(column.filterComponent, {
      setFilter: value => {
        this.handleFilter(value, column.filterId || 'search');
      }
    }) : null)))), /*#__PURE__*/React.createElement("tbody", null, this.props.data.map(val => Object.values(val)).map((row, rIndex) => /*#__PURE__*/React.createElement("tr", {
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
