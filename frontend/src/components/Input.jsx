const Input = ({ icon: Icon, ...props }) => {
    return (
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {Icon && <Icon className="w-5 h-5 text-purple-400" />}
        </div>
        <input
          {...props}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 bg-opacity-90 rounded-lg border border-gray-700
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none
            text-white placeholder-gray-400 transition duration-300 ease-in-out
            hover:bg-gray-700 hover:bg-opacity-95
            "
        />
      </div>
    );
  };
  
  export default Input;
  