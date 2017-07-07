import 'react-native';
import React from 'react';
import Mapview from '../app/Mapview.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { navigation } from './TestData.js'

jest.mock('react-native-maps', () => {
  const React = require.requireActual('react');
  const MapView = require.requireActual('react-native-maps');

  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  return MockMapView;
});

it('renders correctly', () => {
  const component = renderer.create(
    <Mapview navigation={navigation} />
  ).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders callout correctly', () => {
  const component = renderer.create(
    <Mapview navigation={navigation} />
  )
  component.toJSON().children[0].children[1].props.onPress()
  const instance = component.getInstance()
  const stateMarkerID = instance.state.selectedMarker
  const calloutID = component.toJSON().children[0].children[1].props.id

  expect(stateMarkerID).toEqual(calloutID);
});


// number of markers is 2

// press marker to launch callout
