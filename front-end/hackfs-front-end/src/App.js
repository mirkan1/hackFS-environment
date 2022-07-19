import Footer from "./Components/Components/Footer";
import MainArea from "./Components/Components/MainArea";
import Navbar from "./Components/Components/Navbar";
import MintPage from "./Components/Pages/MintPage";
import HomePage from "./Components/Pages/HomePage";
import GamePage from "./Components/Pages/GamePage";
import WalletNotConnectedPage from "./Components/Pages/WalletNotConnectedPage";
import PageNotFound from "./Components/Pages/PageNotFound";
import AppRouter from "./Router/AppRouter";

function App() {
   return (
      <div className="flex flex-col min-h-screen">
         <AppRouter />
      </div>
   );
}

export default App;
