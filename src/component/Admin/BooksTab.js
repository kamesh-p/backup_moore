import React, { useState } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import "./BookTab.css";
import TotalBooks from "./TotalBooks";
import AddBook from "./AddBook";
const BooksTab = () => {
  const [activeTab, setActiveTab] = useState("TotalBooks");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <div>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Profile Tabs"
        className="tab-full-box"
      >
        <Tab label="TotalBooks" value="TotalBooks" />
        <Tab label="Addbook" value="Addbook" />
      </Tabs>

      {activeTab === "TotalBooks" && <TotalBooks />}
      {activeTab === "Addbook" && <AddBook />}
    </div>
  );
};

export default BooksTab;
