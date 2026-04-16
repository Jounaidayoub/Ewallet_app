import React from 'react';

const Header = ({ onNavigate }) => {
  return (
    <header>
      <nav class="navbar">
        <a onClick={() => onNavigate('home')} class="logo" style={{ cursor: 'pointer' }}>
          <img src="/assets/e-wallet-logo.avif" alt="E-Wallet Logo" />
        </a>
        <ul class="nav-links">
          <li><a onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
