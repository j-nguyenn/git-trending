import React from "react";
import "./App.css";
import { FooterComponent } from "./components/footer/footer.component";
import HomePage from "./views/home_page/home_page";

function App() {
  return (
    <div className="App">
      <HomePage />
      <FooterComponent />
    </div>
  );
}

export default App;
