import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Public from './Public';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as router from 'react-router';
import { Provider } from 'react-redux';
import { store } from 'store';

const mockGetRocket = jest.fn((mockdata) => {
  return Promise.resolve(mockdata);
})

const mockdata = [{id: 44, name: "111", description: "dd", height: 4, diameter: 5, mass: 3, photo: ""},
{id: 64, name: "123123123", description: "ddd", height: 3, diameter: 3, mass: 3, photo: ""},
{id: 78, name: "Rocket 1", description: "dfdfdf", height: 2, diameter: 1, mass: 3, photo: ""},
{id: 79, name: "sdfasdf", description: "sdf", height: 2, diameter: 2, mass: 2, photo: ""},
{id: 80, name: "sdfsdf", description: "sdfs", height: 3, diameter: 3, mass: 3, photo: ""}];

const renderPage = async () => {
  const { container } = render(
    <Provider store={store}>
      <Public />
    </Provider>
  );

  return container;
}

describe("Public page test",() => {
  const navigate = jest.fn();

  beforeEach(async () => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    mockGetRocket(mockdata);
  });

  it("should render component", () => {
    renderPage();
  });

  it("should render rocket list", async () => {
    renderPage();

    expect(await screen.findAllByTestId('profile-card')).toBeGreaterThan(0)
  });

  it("should render elements", async () => {
    renderPage(); 

    expect(await screen.findByText("Height:")).toBeInTheDocument();
    expect(await screen.findByText("Diameter:")).toBeInTheDocument();
    expect(await screen.findByText("Mass:")).toBeInTheDocument();
  })
})