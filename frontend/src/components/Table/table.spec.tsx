import React from 'react';
import renderer from 'react-test-renderer';
import Table from '.';

describe('Table', () => {
  test('should render correctly', () => {
    const columnHeaders = ['Hash', 'Time', 'Height'];
    const rows = [['132', '234', '567']];
    const rowsPerPage = 13;
    const component = renderer.create(<Table {...{ columnHeaders, rows, rowsPerPage }} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});