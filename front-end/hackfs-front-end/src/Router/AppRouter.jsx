import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Footer from "../Components/Components/Footer";
import MainArea from "../Components/Components/MainArea";
import Navbar from "../Components/Components/Navbar";
import GamePage from "../Components/Pages/GamePage";
import HomePage from "../Components/Pages/HomePage";
import MintPage from "../Components/Pages/MintPage";
import NavigationConst from "../Components/Pages/NavigationPages";
import PageNotFound from "../Components/Pages/PageNotFound";
import WalletNotConnectedPage from "../Components/Pages/WalletNotConnectedPage";
function AppRouter({ isWalletConnected = false }) {
   return (
      <HashRouter>
         <Routes>
            <Route
               path={NavigationConst.HomePage}
               element={
                  <>
                     <Navbar />
                     <MainArea
                        child={
                           <>
                              <HomePage />
                           </>
                        }
                     />
                     <Footer />
                  </>
               }
            />
            <Route
               path={NavigationConst.GampePage}
               element={
                  <>
                     <Navbar />
                     <MainArea
                        child={
                           <>
                              {isWalletConnected ? (
                                 <GamePage />
                              ) : (
                                 <WalletNotConnectedPage />
                              )}
                           </>
                        }
                     />
                     <Footer />
                  </>
               }
            />
            <Route
               path={NavigationConst.MintPage}
               element={
                  <>
                     <Navbar />
                     <MainArea
                        child={
                           <>
                              {isWalletConnected ? (
                                 <MintPage />
                              ) : (
                                 <WalletNotConnectedPage />
                              )}
                           </>
                        }
                     />
                     <Footer />
                  </>
               }
            />
            <Route
               path="*"
               element={
                  <>
                     <Navbar />
                     <MainArea
                        child={
                           <>
                              <PageNotFound />
                           </>
                        }
                     />
                     <Footer />
                  </>
               }
            />
         </Routes>
      </HashRouter>
   );
}

export default AppRouter;
