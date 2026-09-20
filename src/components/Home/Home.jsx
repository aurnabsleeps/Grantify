import Header from "../Header/Header";
import statueImg from "../../assets/images/statue.png";
import parisImg from "../../assets/images/paris.jpg";
import bigBenImg from "../../assets/images/big-ben.jpg";

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
            <img src={statueImg} alt="University destination" />
          </div>

          <div className="image-card main-card">
            <img src={parisImg} alt="Paris destination" />
          </div>

          <div className="image-card small-card">
            <img src={bigBenImg} alt="London destination" />
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