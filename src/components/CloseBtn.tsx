
'use client'; // This directive makes it a Client Component

import React from 'react';

const CloseBtn = () => {
  const handleClose = () => {
    const bodyTag = document.querySelector<HTMLDivElement>('body');
    if (bodyTag) {
      bodyTag.classList.remove('menuOpen');
    }
    const navbarToggler = document.querySelector<HTMLDivElement>('.navbar-toggler');
    if (navbarToggler) {
      navbarToggler.classList.add('collapsed');
    }
    const navbarCollapse = document.querySelector<HTMLDivElement>('.navbar-collapse');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  };

  return (
    <button type="button" className="closebtn" onClick={handleClose}>
      <img src="/closeicon.png" alt="" />
    </button>
  );
};

export default CloseBtn;