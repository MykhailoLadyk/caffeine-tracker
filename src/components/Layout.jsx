import { useState } from "react";
import Auth from "./Auth";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
function Layout(props) {
  const [showModal, setShowModal] = useState(false);
  const { children } = props;
  const { globalUser, logout } = useAuth();
  const header = (
    <header>
      <div>
        <h1 className="text-gradient">Coffee tracker</h1>
        <p>for coffee Instatiates</p>
      </div>
      {globalUser ? (
        <button
          onClick={() => {
            logout();
          }}
        >
          <p>Logout</p>
        </button>
      ) : (
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          <p>Sign up free</p>
          <i className="fa-solid fa-mug-hot"></i>
        </button>
      )}
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
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <Auth setShowModal={setShowModal}></Auth>
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}

export default Layout;
