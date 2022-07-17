import Button from "./Components/Components/CommonContainers/Button";
import Footer from "./Components/Components/Footer";
import MainArea from "./Components/Components/MainArea";
import Navbar from "./Components/Components/Navbar";
import HomePage from "./Components/Pages/HomePage";

function App() {
   return (
      <div className="flex flex-col min-h-screen">
         <Navbar />
         <MainArea child={<>
         <HomePage/>
         </>}/>
         <Footer/>
      </div>
   );
}

export default App;
