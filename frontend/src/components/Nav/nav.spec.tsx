import React from 'react';
import renderer from 'react-test-renderer';
import Nav from '.';

describe('Nav', () => {
  test('should render correctly', () => {
    const component = renderer.create(<Nav />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});