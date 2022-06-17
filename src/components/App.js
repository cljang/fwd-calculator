import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Calculator from "./Calculator";
import Footer from "./Footer";

function App() {
 
  return (
    <BrowserRouter basename="/calculator">
      <div className="wrapper">
        <Header
          title="React Calculator"
        />
        <Calculator />
        <Footer
          year={new Date().getFullYear()}
          author="Clayton Jang"
        />
      </div>
    </BrowserRouter>
  );
  
}

export default App;
