
'use client'; // This directive makes it a Client Component

import React from 'react';
const closeMenuBtn = () => {
  
  
   let bodyTag= document.querySelector<HTMLDivElement>('body');
      if(bodyTag){
                bodyTag.classList.remove('menuOpen');
      }
   let navbarToggler = document.querySelector<HTMLDivElement>('.navbar-toggler')
        if(navbarToggler) {
         navbarToggler.classList.add('collapsed');
        }

    let navbarCollapse=  document.querySelector<HTMLDivElement>('.navbar-collapse')
        if(navbarCollapse){
          navbarCollapse.classList.remove('show');
        }
  
  

  return (
  <button type="button"  className="closebtn" onClick={closeMenuBtn}>
              <img src="/closeicon.png" alt="" />
            </button>
  );
};

export default closeMenuBtn;