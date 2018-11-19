'use strict';

// Load NPM modules
import autoBind from 'react-autobind';
import React, { Component } from 'react';

// Load antDesign modules
import { Layout, Menu, Breadcrumb } from 'antd';

// Load libs & functions
import { pageRouter } from './common/Router.js';
import { exampleText } from './common/Resources.js';
import { handleOnPageNavigation } from './common/Functions.js';
import { buildBreadcrumb, buildNavigationItems } from './common/Components.jsx';

// Define component class
export default class Application extends Component {
  // Initial Constructor
  constructor( props ) {
    super( props ) && autoBind( this );
    this.render = this.render.bind( this );
    this.state  = {
      page: 'page1',
      increment: 10,
      text: exampleText,
      characters: [],
      planets: [],
      vehicles: [],
      films: [],
      species: []
    };
  }
  
  componentDidMount() {
    this.getPeople( 'https://swapi.co/api/people/' );
    this.getPlanets( 'https://swapi.co/api/planets/' );
    this.getVehicles( 'https://swapi.co/api/vehicles/' );
    this.getFilms( 'https://swapi.co/api/films/' );
    this.getSpecies( 'https://swapi.co/api/people/' );
  }
  
  getPeople( url ) {
    fetch( url )
      .then( results => {
        return results.json();
      } ).then( data => {
        this.setState( { characters: this.state.characters.concat( data.results ) } );
        if ( data.next != null ) {
          this.getPeople( data.next );
        }
      }
    )
  }
  
  getPlanets( url ) {
    fetch( url )
      .then( results => {
        return results.json();
      } ).then( data => {
        this.setState( { planets: this.state.planets.concat( data.results ) } );
        if ( data.next != null ) {
          this.getPlanets( data.next );
        }
      }
    )
  }
  
  getVehicles( url ) {
    fetch( url )
      .then( results => {
        return results.json();
      } ).then( data => {
        this.setState( { vehicles: this.state.vehicles.concat( data.results ) } );
        if ( data.next != null ) {
          this.getVehicles( data.next );
        }
      }
    )
  }
  
  getFilms( url ) {
    fetch( url )
      .then( results => {
        return results.json();
      } ).then( data => {
        this.setState( { films: this.state.films.concat( data.results ) } );
        if ( data.next != null ) {
          this.getFilms( data.next );
        }
      }
    )
  }
  
  getSpecies( url ) {
    fetch( url )
      .then( results => {
        return results.json();
      } ).then( data => {
        this.setState( { species: this.state.species.concat( data.results ) } );
        if ( data.next != null ) {
          this.getSpecies( data.next );
        }
        console.log( data.results );
      }
    )
  }
  
  // Update state
  updateState( state ) {
    return this.setState( state );
  }
  
  // Render
  render() {
    return (
      <Layout className="layout" style={{ height: '100%' }}>
        <Layout.Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[ this.state.page ]}
            style={{ lineHeight: '64px' }}
            onClick={item => handleOnPageNavigation.call( this, item )}>
            {buildNavigationItems( [ 'page1', 'page2' ] )}
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {buildBreadcrumb( [ 'Home', this.state.page ] )}
          </Breadcrumb>
          <div
            style={{
              background: '#fff',
              padding: 24,
              minHeight: 'calc(100vh - 186px)'
            }}>
            {pageRouter( this.state.page )( this.state, this.updateState )}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          If you have any problems, please refer to the README.md for guidance.
        </Layout.Footer>
      </Layout>
    );
  }
}
