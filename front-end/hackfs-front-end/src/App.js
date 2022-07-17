import Footer from "./Components/Components/Footer";
import MainArea from "./Components/Components/MainArea";
import Navbar from "./Components/Components/Navbar";
import MintPage from "./Components/Pages/MintPage";
import HomePage from "./Components/Pages/HomePage";
import GamePage from "./Components/Pages/GamePage";

function App() {
   return (
      <div className="flex flex-col min-h-screen">
         <Navbar />
         <MainArea
            child={
               <>
                  <GamePage />
               </>
            }
         />
         <Footer />
      </div>
   );
}

export default App;
