import Header from "../Header/Header";

const Home = () => {
  return (
    <div className="hero-container">

      <Header />

      <main className="hero">

        <div className="hero-badge">
           Smart Education, Smarter Investment
        </div>

        <h1>
          Top Global Universities. Unlock
          <br />
          Maximum Scholarships.
        </h1>

        <p>
          Find affordable global courses. We guide you from profile
          <br />
          evaluation to visa approval.
        </p>

        <div className="hero-images">

          <div className="image-card small-card">
            <img src="src/assets/images/statue.png" alt="University destination" />
          </div>

          <div className="image-card main-card">
            <img src="src/assets/images/paris.jpg" alt="Paris destination" />
          </div>

          <div className="image-card small-card">
            <img src="src/assets/images/big-ben.jpg" alt="London destination" />
          </div>

        </div>

        <div className="trust-badge">
           Trusted by Thousands
        </div>

      </main>

    </div>
  );
};

export default Home;