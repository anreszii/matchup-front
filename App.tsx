import "expo-dev-client";

import { Provider } from "react-redux";
import store from "@/store";
import { Navigation } from "@/views/Navigation.js";

import { I18nextProvider } from "react-i18next";
import { i18n } from "@/plugins/i18n";

export default function App() {

    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <Navigation/>
            </I18nextProvider>
        </Provider>
    );
}
