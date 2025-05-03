import { useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import CoffeeForm from "./components/CoffeeForm";
import History from "./components/History";
import Stats from "./components/Stats";
import { useAuth } from "./context/AuthContext";
function App() {
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuthenticated = globalUser;
  const isData = globalData && !!Object.keys(globalData || {}).length > 0;
  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );
  return (
    <Layout>
      <Hero />

      <CoffeeForm isAuthenticated={isAuthenticated} />
      {isLoading && <p>Loading data...</p>}
      {isAuthenticated && isData ? authenticatedContent : false}
    </Layout>
  );
}

export default App;
