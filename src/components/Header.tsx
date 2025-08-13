import { memo } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

    return (
        <header className="w-full bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-extrabold shadow-md"></div>
                        <div>
                            <NavLink to="/" className="text-lg font-semibold text-indigo-900">
                                Logoo
                            </NavLink>
                            <div className="text-xs text-gray-500 -mt-1">Tanstack Query</div>
                        </div>
                    </div>
                    <nav className="flex items-center gap-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md transition-all duration-200 font-medium ${isActive
                                    ? "bg-indigo-500 text-white"
                                    : "text-indigo-800/90 hover:bg-indigo-50"
                                }`
                            }
                        >
                            Country
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md transition-all duration-200 font-medium ${isActive
                                    ? "bg-indigo-500 text-white"
                                    : "text-indigo-800/90 hover:bg-indigo-50"
                                }`
                            }
                        >
                            Phone
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default memo(Header);
