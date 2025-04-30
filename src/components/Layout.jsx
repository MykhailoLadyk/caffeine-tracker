function Layout(props) {
  const { children } = props;
  const header = (
    <header>
      <div>
        <h1 className="text-gradient">Coffee tracker</h1>
        <p>for coffee Instatiates</p>
      </div>
      <button>
        <p>Sign up free</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>
    </header>
  );
  const footer = (
    <footer>
      {/* <p>
        <span className="text-gradient">Coffee tracker</span> was made by{" "}
        <a href="" target="blank">
          Me
        </a>{" "}
        using fantaCSS
      </p> */}
    </footer>
  );
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}

export default Layout;
