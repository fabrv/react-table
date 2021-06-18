# minimal-react-table

> Simple React Table with filtering, sorting and pagination

[![NPM](https://img.shields.io/npm/v/react-table.svg)](https://www.npmjs.com/package/react-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save minimal-react-table
```

## Usage

```jsx
import React, { Component } from 'react'

import TableComponent from 'react-table'

class Example extends Component {
  data = [{name: 'John Doe', age: 45}]
  render() {
    return <TableComponent
      data={data}
    />
  }
}
```

## License

MIT © [fabrv](https://github.com/fabrv)
