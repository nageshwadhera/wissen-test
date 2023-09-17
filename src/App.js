import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import IRoutes from "./routing/IRoutes";

function App() {
  return (
    <Provider store={store}>
      <IRoutes />
    </Provider>
  );
}

export default App;
