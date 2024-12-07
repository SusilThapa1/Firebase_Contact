const Header = () => {
  return (
    <div className="mx-auto my-3 flex h-[60px] w-[360px] items-center justify-center gap-1 rounded-xl bg-white px-4 py-2">
      <img className="h-8 w-5" src="images/icon.png" alt="logo" />
      <h1 className="text-2xl font-bold text-black">Firebase Contact App</h1>
    </div>
  );
};

export default Header;
