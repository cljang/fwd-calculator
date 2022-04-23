import Header from "./Header";
import Calculator from "./Calculator";
import Footer from "./Footer";

function App() {
 
  return (
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
  );
  
}

export default App;
