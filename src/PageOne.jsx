'use strict';

// Load NPM modules
import React from 'react';

// Load antDesign modules
import { Input, Table } from 'antd';

// Gets an object which has the count of letters
const getLetterCount = text => {
    return text.replace(/\W/g, '').split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
};

// Define columns
const getColumns = (text, increment) => {
    getRowTemplate(text,increment);
    let count = getLetterCount(text);
    let vals = [];
    Object.keys(count).forEach(e => vals.push(count[e]));
    var max = Math.max(...vals);
    let cols = [];
    cols.push({
        title: 'Letter',
        dataIndex: 'name'
    });
    for(let i = 0; i+increment<max;i+=increment){
        cols.push({
            title: `${[i]} - ${[i+increment]}`,
            dataIndex: `${[i]} - ${[i+increment]}`
        });
    }
    console.log(cols);
  return cols;
};

// Build entry
const getLetterRow = (letter, count, template) => {
  return {};
};

// Get row template
const getRowTemplate = (text, increment) => {
    let row = {'name': void 0};
    let count = getLetterCount(text);
    let vals = [];
    Object.keys(count).forEach(e => vals.push(count[e]));
    var max = Math.max(...vals);
    for(let i = 0; i+increment<max;i+=increment){
        row[`'${[i]} - ${[i+increment]}'`] = '-';
    }
  return row;
};

// Define data source
const getDataSource = (text, increment) => {
  return [];
};

// Build text box
const buildTextBox = (state, updateState) => (
  <Input.TextArea
    rows={8}
    style={{ marginBottom: '24px' }}
    value={state.text}
    onChange={e => updateState({ text: e.target.value })}
  />
);

// Build table
const buildTable = (dataSource, columns) => (
  <Table dataSource={dataSource} columns={columns} />
);

// Define export
export default (state, updateState) => (
  <div className="page-one">
    <h2>Enter Text:</h2>
    {buildTextBox(state, updateState)}
    <h2>View Letters by Count:</h2>
    {buildTable(
      getDataSource(state.text, state.increment),
      getColumns(state.text, state.increment)
    )}
  </div>
);
