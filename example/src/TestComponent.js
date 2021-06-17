import React, { Component } from "react";
import { TableComponent } from "react-table";

export default class TestComponent extends Component {
  data = [
    {
      ID: '435132',
      name: 'Fabrizio',
      nationality: 'Kazak'
    },
    {
      ID: '897894',
      name: 'John Doe',
      nationality: 'Brit'
    },
    {
      ID: '909807',
      name: 'Thom Peters',
      nationality: 'Scot'
    },
    {
      ID: '198723',
      name: 'Juan Perez',
      nationality: 'Mexico'
    },
    {
      ID: '495963',
      name: 'Mario Martinez',
      nationality: 'Spain'
    },
    {
      ID: '3284994',
      name: 'Ho Chi',
      nationality: 'Vietnam'
    },
    {
      ID: '198723',
      name: 'Joao Da Silva',
      nationality: 'Portuguese'
    },
    {
      ID: '495963',
      name: 'Ngolo Kante',
      nationality: 'France'
    },
    {
      ID: '3284994',
      name: 'Hojin Lee',
      nationality: 'Korea'
    }
  ]
  keys = ['ID', 'Name', 'Nationality']
  
  state = {
    data: this.data.slice(0, 3),
    page: 1
  }

  pageChange(page) {
    const data = this.data.slice((page - 1) * 3, (page - 1) * 3 + 3)
    this.setState({
      data: data,
      page: page
    })
  }

  nextPage() {
    this.pageChange(this.state.page + 1)
  }

  previousPage() {
    this.pageChange(this.state.page - 1)
  }

  render() {
    return (
      <div>
      <TableComponent 
        onCellClick={(e) => console.log(e)}
        onNextPageClick={() => this.nextPage()}
        onPreviousPageClick={() => this.previousPage()}
        onPageClick={(e) => this.pageChange(e)}
        className='table' 
        data={this.state.data} 
        keys={this.keys}
        pagination={true}
        showNext={this.state.page > 0 && this.state.page < 3}
        showPrevious={this.state.page > 1 && this.state.page < 4}
        pages={Math.ceil(this.data.length / 3)}
      />
      </div>
    )
  }
}