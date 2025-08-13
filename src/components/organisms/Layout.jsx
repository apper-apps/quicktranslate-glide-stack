import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { AuthContext } from "../../App";

const Layout = () => {
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Header />
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName || user?.name || 'User'}
                </span>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="LogOut" size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;