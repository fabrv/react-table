import React, { Component } from 'react'

export class TableComponent extends Component {
  filterValues = {}
  state = {
    sortValues: {}
  }

  constructor(props) {
    super(props)

    this.columns = this.columnsObject(this.props.columns, this.props.data)
    this.pages = typeof this.props.pages === 'number' ? this.props.pages : 0
    this.handleFilter = this.handleFilter.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns !== this.props.columns) {
      this.columns = this.columnsObject(this.props.columns, this.props.data)
    }
    if (prevProps.pages !== this.props.pages) {
      this.pages = typeof this.props.pages === 'number' ? this.props.pages : 0
    }
  }

  columnsObject(prop, data) {
    const obj = prop || Object.keys(data[0])
    if (typeof obj[0] === 'string') {
      return obj.map((column) => ({
        caption: column,
        filterComponent: null
      }))
    } else {
      return obj
    }
  }

  handleCellClick(row, column, value, target) {
    const payload = {
      row: row,
      column: column,
      value: value,
      target: target
    }

    if (this.props.onCellClick) {
      this.props.onCellClick(payload)
    }
  }

  handlePageClick(page) {
    if (this.props.onPageClick) {
      this.props.onPageClick(page)
    }
  }

  handleNextPageClick() {
    if (this.props.onNextPageClick) {
      this.props.onNextPageClick()
    }
  }

  handlePreviousPageClick() {
    if (this.props.onPreviousPageClick) {
      this.props.onPreviousPageClick()
    }
  }

  handleFilter(value, id) {
    this.filterValues[id] = {
      value: value
    }

    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.filterValues)
    }
  }

  handleSort(id) {
    const val = this.state.sortValues[id]?.value
    const sortValue = {}
    sortValue[id] = { value: val ? (val + 1) % 3 : 1 }

    this.setState({
      sortValues: sortValue
    })

    if (this.props.onSortChange) {
      this.props.onSortChange(sortValue)
    }
  }

  render() {
    return (
      <div>
        <table className={this.props.className} style={this.props.style}>
          <thead>
            <tr>
              {this.columns.map((column, index) => (
                <th
                  onClick={(e) => {
                    this.handleCellClick(0, index, column.caption, e.target)
                  }}
                  key={index}
                  scope='col'
                >
                  <span
                    onClick={(_) => {
                      if (column.sortable) this.handleSort(column.id)
                    }}
                    style={column.sortable ? { cursor: 'pointer' } : null}
                  >
                    {column.caption}
                  </span>
                  {this.state.sortValues[column.id]?.value === 1 ? ' ▴' : null}
                  {this.state.sortValues[column.id]?.value === 2 ? ' ▾' : null}
                  {column.filterComponent ? (
                    <column.filterComponent
                      setFilter={(value) => {
                        this.handleFilter(value, column.id || 'search')
                      }}
                    />
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {this.props.data
              .map((val) => Object.values(val))
              .map((row, rIndex) => (
                <tr key={rIndex}>
                  {row.map((cell, cIndex) => (
                    <td
                      onClick={(e) =>
                        this.handleCellClick(rIndex, cIndex, cell, e.target)
                      }
                      key={cIndex}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {this.props.pagination ? (
          <ul className='pagination'>
            {this.props.showPrevious ? (
              <li className='page-item'>
                <button
                  onClick={() => this.handlePreviousPageClick()}
                  className='btn btn-link'
                >
                  &lt;
                </button>
              </li>
            ) : (
              ''
            )}
            {[...new Array(this.pages)].map((_, index) => (
              <li className='page-item' key={index}>
                <button
                  onClick={() => this.handlePageClick(index + 1)}
                  className='btn btn-link'
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {this.props.showNext ? (
              <li className='page-item'>
                <button
                  onClick={() => this.handleNextPageClick()}
                  className='btn btn-link'
                >
                  &gt;
                </button>
              </li>
            ) : (
              ''
            )}
          </ul>
        ) : (
          ''
        )}
      </div>
    )
  }
}
