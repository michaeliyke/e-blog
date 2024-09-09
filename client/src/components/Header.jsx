export const Header = () => {
  return (
    <header className="h-15 w-full p-2">
      <div
        className="flex items-center border-2 border-black h-12 rounded-md justify-between
                      p-1"
      >
        <div
          className="flex items-center border border-black overflow-hidden h-9
        w-[90px] rounded-md ml-4"
        >
          <img src="/E.png" width={200} height={200} alt="pic" />
        </div>
        <div
          className="flex items-center border border-black w-[40%] h-9
        rounded-md"
        >
          <div>
            <svg
              className="flex items-center ml-3 mr-2"
              width="20px"
              height="20px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(1, 0, 0, 1, 0, 0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#000000"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </div>
          <input
            type="text"
            className="h-8 text-black text-md border-none outline-none bg-transparent"
            placeholder="Search"
          />
        </div>
        <div className="mr-4">
          <button className="bg-indigo-600 rounded-xl w-16 h-8 hover:bg-indigo-500 active:bg-indigo-100 active:text-indigo-600 mr-0.5">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
};
