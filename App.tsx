import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import Navigation from "./src/navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/localization/i18n";
import "intl-pluralrules/polyfill"; // Импортируйте полифилл

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Navigation />
      </I18nextProvider>
    </Provider>
  );
};

export default App;
