import React, { Component } from "react";
import { TableComponent } from "react-table";

const textFilter = (props) => {
  return (
    <input 
      className="form-select" 
      style={{width: '100%'}} 
      onChange={(e) => props.setFilter(e.target.value)}/>
  )
}

const selectFilter = (props, options) => (
  <select 
    className="form-select" 
    style={{width: '100%'}} 
    onChange={(e) => props.setFilter(e.target.value)}
  >
    <option defaultValue></option>
    {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
  </select>
)

export default class TestComponent extends Component {
  data = [
    {
      id: '435132',
      name: 'Fabrizio',
      nationality: 'Kazak'
    },
    {
      id: '897894',
      name: 'John Doe',
      nationality: 'Brit'
    },
    {
      id: '909807',
      name: 'Thom Peters',
      nationality: 'Scot'
    },
    {
      id: '198723',
      name: 'Juan Perez',
      nationality: 'Mexico'
    },
    {
      id: '495963',
      name: 'Mario Martinez',
      nationality: 'Spain'
    },
    {
      id: '3284994',
      name: 'Ho Chi',
      nationality: 'Vietnam'
    },
    {
      id: '198723',
      name: 'Joao Da Silva',
      nationality: 'Portuguese'
    },
    {
      id: '495963',
      name: 'Ngolo Kante',
      nationality: 'France'
    },
    {
      id: '3284994',
      name: 'Hojin Lee',
      nationality: 'Korea'
    }
  ]
  columns = [
    {
      caption: 'ID',
      filterComponent: textFilter,
      id: 'id',
      sortable: true
    },
    {
      caption: 'Name',
      filterComponent: textFilter,
      id: 'name',
      sortable: true
    },
    {
      caption: 'Nationality',
      filterComponent: (props) => selectFilter(props, this.data.map(a => a.nationality).filter((v, i, a) => a.indexOf(v) === i)),
      id: 'nationality'
    }
  ]
  
  state = {
    data: this.data,
    page: 1
  }

  pageChange(page) {
    this.setState({
      page: page
    })
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1
    })
  }

  previousPage() {
    this.setState({
      page: this.state.page - 1
    })
  }

  filter(fields) {
    fields = {
      nationality: fields.nationality?.value || '',
      name: fields.name?.value || '',
      id: fields.id?.value || ''
    }

    const data = this.data.filter(row => {
      return (
        row.name.toLowerCase().indexOf(fields.name.toLowerCase()) !== -1 &&
        row.id.toLowerCase().indexOf(fields.id.toLowerCase()) !== -1 &&
        (fields.nationality === '' || row.nationality === fields.nationality)
      )
    })

    this.setState({
      data: data,
      page: 1
    })
  }

  sort(e) {
    const key = Object.keys(e)[0]
    const sortValue = e[key].value
    
    const data = sortValue === 0 
      ? [...this.data] 
      : [...this.data].sort((a, b) => {
        var nameA = a[key].toUpperCase()
        var nameB = b[key].toUpperCase()
        if (nameA < nameB) {
          return sortValue === 1 ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortValue === 1 ? 1 : -1
        }

        return 0
      })

    this.setState({
      data: data,
      page: 1
    })
  }

  render() {
    return (
      <div>
        <h1>Minimal React Table</h1>
        <h2>Full example</h2>
        <TableComponent 
          onCellClick={(e) => console.log(e)}
          onNextPageClick={() => this.nextPage()}
          onPreviousPageClick={() => this.previousPage()}
          onPageClick={(e) => this.pageChange(e)}
          onFilterChange={(e) => this.filter(e)}
          onSortChange={(e) => this.sort(e)}
          className='table' 
          data={this.state.data.slice((this.state.page - 1) * 3, (this.state.page - 1) * 3 + 3)}
          columns={this.columns}
          pagination={true}
          showNext={this.state.page < Math.ceil(this.state.data.length/3)}
          showPrevious={this.state.page > 1}
        />

        <h2>Most basic example</h2>
        <TableComponent
          data={this.data}
        />
        
        <h2>Basic example with column names</h2>
        <TableComponent
          columns={['ID', 'Name', 'Nationality']}
          data={this.data}
        />
      </div>
    )
  }
}