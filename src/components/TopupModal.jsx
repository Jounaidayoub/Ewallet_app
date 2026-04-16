import React, { useState } from 'react';

const TopupModal = ({ user, onClose, onTopup }) => {
  const [sourceCard, setSourceCard] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onTopup(sourceCard, Number(amount));
    onClose();
  };

  return (
    <div className="popup-overlay active" id="rechargePopup">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Effectuer un rechargement</h2>
          <button className="btn-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="popup-body">
          <form id="rechargeForm" className="recharge-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sourceCard-recharge">
                <i className="fas fa-credit-card"></i> Depuis ma carte
              </label>
              <select
                id="sourceCard-recharge"
                value={sourceCard}
                onChange={(e) => setSourceCard(e.target.value)}
                required
              >
                <option value="" disabled>Sélectionner une carte</option>
                {user.wallet.cards.map((c) => (
                  <option key={c.numcards} value={c.numcards}>{c.type} ****{c.numcards}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amountrecharge">
                <i></i> Montant
              </label>
              <div className="amount-input">
                <input
                  type="number"
                  id="amountrecharge"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                  required
                />
                <span className="currency">MAD</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" id="submitRechargeBtn">
                <i className="fas fa-paper-plane"></i> Recharger
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopupModal;
