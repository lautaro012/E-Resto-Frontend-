import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';


  const view  = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  describe('App', () => {
    it('should render', () => { 
        expect(view).toBeTruthy()
    })
  })
