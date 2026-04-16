import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home({ setCurrentPage, }) {

    return (
        <>
            <Header onNavigate={setCurrentPage} />
            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1>E-Wallet</h1>
                        <p>Gérez vos finances facilement et en toute sécurité. Simplifiez vos paiements et transactions grâce à notre solution moderne.</p>
                        <div className="buttons">
                            <button className="btn btn-primary" onClick={() => setCurrentPage('login')}>Login</button>
                            <button className="btn btn-secondary">Sign in</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/assets/e-Wallet6.gif" alt="E-Wallet Illustration" />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}