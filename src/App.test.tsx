import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
<<<<<<< Updated upstream
import { store } from '../src/redux/store';
=======
import { store } from './redux/store';
>>>>>>> Stashed changes
import App from './App';


  const view  = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
<<<<<<< Updated upstream
});
=======

  describe('App', () => {
    it('should render', () => { 
        expect(view).toBeTruthy()
    })
  })
>>>>>>> Stashed changes
