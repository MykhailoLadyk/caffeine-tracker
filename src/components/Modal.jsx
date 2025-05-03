import ReactDOM from "react-dom";
function Modal(props) {
  const { children, setShowModal } = props;
  return ReactDOM.createPortal(
    <div className="modal-container">
      <button
        onClick={() => {
          setShowModal(false);
        }}
        className="modal-underlay"
      />
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
