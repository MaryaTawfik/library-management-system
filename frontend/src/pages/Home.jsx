// pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to My E-Library!</h1>
      <p className="text-gray-700 mb-2">
        Here you can browse books, search for new titles, and manage your bookshelf.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white shadow rounded">Book 1</div>
        <div className="p-4 bg-white shadow rounded">Book 2</div>
        <div className="p-4 bg-white shadow rounded">Book 3</div>
      </div>
    </div>
  );
};

export default Home;
