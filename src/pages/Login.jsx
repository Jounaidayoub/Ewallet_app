import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = ({ users, onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const user = users.find(u => u.email === email && u.password === password);
    setLoading(false);

    if (user) {
      onLogin(user);
    } else {
      alert("Bad credentials.");
    }
  };

  return (
    <>
      <Header onNavigate={onNavigate} />
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Connexion</h1>
            <p>Accédez à votre E-Wallet en toute sécurité et gérez vos transactions en toute confiance.</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {loading ? "Checking!!!" : "Se connecter"}
              </button>
            </form>
            <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
              Vous n'avez pas encore de compte ?
              <a href="#" style={{ color: '#3b66f6', fontWeight: 600 }}> S'inscrire</a>
            </p>
          </div>
          <div className="hero-image">
            <img src="/assets/e-Wallet6.gif" alt="Illustration de connexion" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;
