'use strict';

// Load NPM modules
import React from 'react';
import { Table } from 'antd';

const getRow = ( character, state ) => {
  
  let films     = character.films.forEach( e => state.films.find( f => {
    if ( f.url == e ) return f.name;
  } ) );
  let homeworld = state.planets.find( p => {
    if ( p.url == character.homeworld ) return p.name;
  } );
  let vehicles  = character.vehicles.forEach( v => state.vehicles.find( f => {
    if ( f.url == v ) return f.name;
  } ) );
  
  character[ "description" ] = `${character.name} is from the planet ${homeworld}, has appeared in the films ${films}, and can operate the following vehicles: ${vehicles}`;
  return character;
}

const getColumns = () => {
  return [ {
    title: 'Name',
    dataIndex: 'name',
    key: 'Name'
  },
    {
      title: 'Birth Year',
      dataIndex: 'birth_year',
      key: 'Birth Year'
    },
    {
      title: 'Eye Color',
      dataIndex: 'eye_color',
      key: 'Eye Color'
    }, {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'Gender'
    }, {
      title: 'Height',
      dataIndex: 'height',
      key: 'Height'
    }, {
      title: 'Weight',
      dataIndex: 'mass',
      key: 'Weight'
    } ]
}

const getDataSource = state => {
  let characters = [];
  state.characters.forEach( e => characters.push( getRow( e, state ) ) );
  return characters;
}

// Build table
const buildTable = ( dataSource, columns ) => (
  <Table dataSource={dataSource} columns={columns}
         expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}/>
);

// Define export
export default ( state, updateState ) => (
  <div className="page-two">
    <h2>Click a character to expand for more info:</h2>
    {buildTable(
      getDataSource( state ),
      getColumns()
    )}
  </div>
);
