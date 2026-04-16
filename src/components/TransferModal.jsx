import React, { useState } from 'react';

const TransferModal = ({ user, onClose, onTransfer }) => {
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [sourceCard, setSourceCard] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onTransfer(beneficiaryId, sourceCard, Number(amount));
    onClose();
  };

  return (
    <div className="popup-overlay active" id="transferPopup">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Effectuer un transfert</h2>
          <button className="btn-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="popup-body">
          <form id="transferForm" className="transfer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="beneficiary">
                <i className="fas fa-user"></i> Bénéficiaire
              </label>
              <select id="beneficiary" value={beneficiaryId} onChange={(e) => setBeneficiaryId(e.target.value)} required>
                <option value="" disabled>Choisir un bénéficiaire</option>
                {user.wallet.beneficiaries.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sourceCard">
                <i className="fas fa-credit-card"></i> Depuis ma carte
              </label>
              <select id="sourceCard" value={sourceCard} onChange={(e) => setSourceCard(e.target.value)} required>
                <option value="" disabled>Sélectionner une carte</option>
                {user.wallet.cards.map((c) => (
                  <option key={c.numcards} value={c.numcards}>{c.type} ****{c.numcards}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amount">
                <i></i> Montant
              </label>
              <div className="amount-input">
                <input
                  type="number"
                  id="amount"
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
              <button type="submit" className="btn btn-primary" id="submitTransferBtn">
                <i className="fas fa-paper-plane"></i> Transférer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
