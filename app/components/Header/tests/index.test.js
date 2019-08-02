import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(<Header setIsDrawerOpen={() => {}} isDrawerOpen={false} />);
    expect(renderedComponent.length).toEqual(1);
  });
});
