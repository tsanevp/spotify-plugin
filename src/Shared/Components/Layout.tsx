import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Header */}
      <header className="bg-gray-800 text-white p-4">
        <nav className="mx-auto">
          <h1 className="text-2xl font-bold">My App</h1>
          {/* Navigation Links */}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto p-4">
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="mx-auto text-center">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
