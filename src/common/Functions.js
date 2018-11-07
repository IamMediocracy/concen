'use strict';

const startCase = require('lodash.startcase');

// Converts camel case string to a sentence case
export const formatCamelCaseString = text => {
    return startCase(text);
};

// Handles page navigation
export const handleOnPageNavigation = item =>
  this.setState({
    page: item.key
  });
