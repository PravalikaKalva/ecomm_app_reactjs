const Header = (props) => {
  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleCartView = () => {
    window.location.href = "/cartview";
  };
  return (
    <div className="heading">
      <h1>Ecomm App</h1>
      <button onClick={handleCartView} className="btn btn-light">
        <h5>
          Cart
          <sup id="sup">{props.count}</sup>
        </h5>
      </button>
      <button onClick={handleLogOut} className="btn btn-danger">
        Log Out
      </button>
    </div>
  );
};

export default Header;
