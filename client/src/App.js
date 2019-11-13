import React, { useState } from "react";
import OverviewPage from "./pages/OverviewPage";

import styles from "./App.module.css";

const App = () => {
  const [view, setView] = useState("main");
  return (
    <div className={styles.app}>
      <div className="App">
        {view === "main" && <OverviewPage setView={setView} />}
      </div>
    </div>
  );
};

export default App;
