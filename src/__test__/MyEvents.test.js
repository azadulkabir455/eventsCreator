import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MyEvents from '../pages/MyEvents'; // Adjust the import path
import useCurrentUser from '../hooks/useCurrentUser';
import useEvents from '../hooks/useEvents';
import Loader from '../component/globalcomponent/Loader'; // Adjust the import path

// Mocking the hooks
jest.mock('../hooks/useCurrentUser');
jest.mock('../hooks/useEvents');
jest.mock('../component/globalcomponent/Loader');

const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    currentUser: { id: 'user1', name: 'John Doe', email: 'john@example.com' },
  },
});

describe('MyEvents Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = (component) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('should display loading state', () => {
    useCurrentUser.mockReturnValue([[{ id: 'user1', name: 'John Doe', email: 'john@example.com' }]]);
    useEvents.mockReturnValue([true, []]);
    Loader.mockImplementation(() => <div>Loading...</div>);

    renderWithProvider(<MyEvents />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display message when there are no events', () => {
    useCurrentUser.mockReturnValue([[{ id: 'user1', name: 'John Doe', email: 'john@example.com' }]]);
    useEvents.mockReturnValue([false, []]);

    renderWithProvider(<MyEvents />);

    expect(screen.getByText('Oops')).toBeInTheDocument();
    expect(screen.getByText("You didn't have created event yet!")).toBeInTheDocument();
  });

  it('should display user profile information', () => {
    useCurrentUser.mockReturnValue([[{ id: 'user1', name: 'John Doe', email: 'john@example.com' }]]);
    useEvents.mockReturnValue([false, []]);

    renderWithProvider(<MyEvents />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
