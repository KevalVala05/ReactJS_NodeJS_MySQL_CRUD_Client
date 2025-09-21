import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Router } from "./config/RouterConfig";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => (
  <Provider store={store}>
    <TooltipProvider>
      <ToastContainer />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </TooltipProvider>
  </Provider>
);

export default App;
