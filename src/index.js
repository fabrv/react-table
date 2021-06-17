import React, { Component } from 'react'

export class TableComponent extends Component {
  constructor(props) {
    super(props)

    this.keys = this.props.keys
      ? this.props.keys
      : Object.keys(this.props.data[0])

    this.pages = typeof this.props.pages === 'number' ? this.props.pages : 0
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keys !== this.props.keys) {
      this.keys = this.props.keys
        ? this.props.keys
        : Object.keys(this.props.data[0])
    }
    if (prevProps.pages !== this.props.pages) {
      this.pages = typeof this.props.pages === 'number' ? this.props.pages : 0
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
    return payload
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

  render() {
    return (
      <div>
        <table className={this.props.className} style={this.props.style}>
          <thead>
            <tr>
              {this.keys.map((key, index) => (
                <th
                  onClick={(e) => this.handleCellClick(0, index, key, e.target)}
                  key={index}
                  scope='col'
                >
                  {key}
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
