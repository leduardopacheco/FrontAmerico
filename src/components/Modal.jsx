import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeInOverlay 0.3s ease-out',
  },
  modal: {
    backgroundColor: 'gray',
    padding: '30px',
    borderRadius: '15px',
    width: '500px',
    maxWidth: '90%',
    position: 'relative',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    animation: 'scaleIn 0.3s ease-out',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    fontSize: '24px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: 'black',
    transition: 'color 0.3s ease',
  },
  content: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
};

// // Adicionando animações no estilo global
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(`
//   @keyframes fadeInOverlay {
//     from { background-color: rgba(0, 0, 0, 0); }
//     to { background-color: rgba(0, 0, 0, 0.7); }
//   }
// `, styleSheet.cssRules.length);

// styleSheet.insertRule(`
//   @keyframes scaleIn {
//     from { transform: scale(0.9); opacity: 0; }
//     to { transform: scale(1); opacity: 1; }
//   }
// `, styleSheet.cssRules.length);

export default Modal;
