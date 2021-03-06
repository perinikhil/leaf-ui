import React from 'react';
import { View as ReactNativeView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const View = styled(
  ({
    component,
    children,
    ...props
  }) => React.createElement(component, props, children),
)`
  ${' '}
`;

View.propTypes = {
  component: PropTypes.node.isRequired,
  children: PropTypes.node,
};

View.defaultProps = {
  component: ReactNativeView,
};

export default View;
