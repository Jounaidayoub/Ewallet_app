import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransferModal from '../components/TransferModal';
import TopupModal from '../components/TopupModal';

const Dashboard = ({ user, users, onUpdateUser, onLogout }) => {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showTopup, setShowTopup] = useState(false);

  const handleTransfer = async (beneficiaryId, sourceCard, amount) => {
    const beneficiary = user.wallet.beneficiaries.find(b => b.id === beneficiaryId);
    const recipient = users.find(u => u.account === beneficiary.account);

    if (!recipient) {
      alert("Recipient not found");
      return;
    }

    if (user.wallet.balance < amount) {
      alert("Insufficient balance");
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const updatedUser = { ...user };
    updatedUser.wallet.balance -= amount;
    updatedUser.wallet.transactions.push({
      id: Date.now(),
      type: "debit",
      amount: amount,
      date: new Date().toLocaleString(),
      to: recipient.name
    });

    const updatedRecipient = { ...recipient };
    updatedRecipient.wallet.balance += amount;
    updatedRecipient.wallet.transactions.push({
      id: Date.now() + 1,
      type: "credit",
      amount: amount,
      date: new Date().toLocaleString(),
      from: user.name
    });

    onUpdateUser(updatedUser);
    onUpdateUser(updatedRecipient);
    alert("Transfer successful!");
  };

  const handleTopup = async (cardNumber, amount) => {
    if (amount < 10 || amount > 5000) {
      alert("Please enter a valid amount (10 - 5000)");
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const updatedUser = { ...user };
    const card = updatedUser.wallet.cards.find(c => c.numcards === cardNumber);
    if (!card) return;

    card.balance -= amount;
    updatedUser.wallet.balance += amount;

    onUpdateUser(updatedUser);
    alert("Top-up successful!");
  };

  const monthlyIncome = user.wallet.transactions
    .filter(t => t.type === "credit")
    .reduce((total, t) => total + t.amount, 0);

  const monthlyExpenses = user.wallet.transactions
    .filter(t => t.type === "debit")
    .reduce((total, t) => total + t.amount, 0);

  return (
    <>
      <header>
        <nav className="navbar">
          <a onClick={() => onLogout()} className="logo" style={{ cursor: 'pointer' }}>
            <img src="/assets/e-wallet-logo.avif" alt="Logo E-Wallet" />
          </a>
          <ul className="nav-links">
            <li><button className="btn btn-secondary" onClick={onLogout}>Déconnexion</button></li>
          </ul>
        </nav>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <aside className="dashboard-sidebar">
            <nav className="sidebar-nav">
              <ul>
                <li className="active"><a href="#"><i className="fas fa-home"></i> <span>Vue d'ensemble</span></a></li>
                <li><a href="#"><i className="fas fa-exchange-alt"></i> <span>Transactions</span></a></li>
                <li><a href="#"><i className="fas fa-credit-card"></i> <span>Mes cartes</span></a></li>
                <li><a href="#"><i className="fas fa-paper-plane"></i> <span>Transferts</span></a></li>
                <li className="separator"></li>
                <li><a href="#"><i className="fas fa-headset"></i> <span>Aide & Support</span></a></li>
              </ul>
            </nav>
          </aside>

          <div className="dashboard-content">
            <section className="dashboard-section active">
              <div className="section-header">
                <h2>Bonjour, <span>{user.name}</span> !</h2>
                <p className="date-display">{new Date().toLocaleDateString("fr-FR")}</p>
              </div>

              <div className="summary-cards">
                <div className="summary-card">
                  <div className="card-icon blue"><i className="fas fa-wallet"></i></div>
                  <div className="card-details">
                    <span className="card-label">Solde disponible</span>
                    <span className="card-value">{user.wallet.balance} {user.wallet.currency}</span>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="card-icon green"><i className="fas fa-arrow-up"></i></div>
                  <div className="card-details">
                    <span className="card-label">Revenus</span>
                    <span className="card-value">{monthlyIncome} MAD</span>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="card-icon red"><i className="fas fa-arrow-down"></i></div>
                  <div className="card-details">
                    <span className="card-label">Dépenses</span>
                    <span className="card-value">{monthlyExpenses} MAD</span>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="card-icon purple"><i className="fas fa-credit-card"></i></div>
                  <div className="card-details">
                    <span className="card-label">Cartes actives</span>
                    <span className="card-value">{user.wallet.cards.length}</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Actions rapides</h3>
                <div className="action-buttons">
                  <button className="action-btn" onClick={() => setShowTransfer(true)}>
                    <i className="fas fa-paper-plane"></i>
                    <span>Transférer</span>
                  </button>
                  <button className="action-btn" onClick={() => setShowTopup(true)}>
                    <i className="fas fa-plus-circle"></i>
                    <span>Recharger</span>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-hand-holding-usd"></i>
                    <span>Demander</span>
                  </button>
                </div>
              </div>

              <div className="recent-transactions">
                <div className="section-header">
                  <h3>Transactions récentes</h3>
                </div>
                <div className="transactions-list">
                  {user.wallet.transactions.map(t => (
                    <div className="transaction-item" key={t.id}>
                      <div>{t.date}</div>
                      <div>{t.amount} MAD</div>
                      <div style={{ color: t.type === 'debit' ? 'red' : 'green' }}>{t.type}</div>
                    </div>
                  )).reverse()}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {showTransfer && (
        <TransferModal
          user={user}
          onClose={() => setShowTransfer(false)}
          onTransfer={handleTransfer}
        />
      )}

      {showTopup && (
        <TopupModal
          user={user}
          onClose={() => setShowTopup(false)}
          onTopup={handleTopup}
        />
      )}

      <Footer />
    </>
  );
};

export default Dashboard;
