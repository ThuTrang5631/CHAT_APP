import signUpImage from "../../assets/signup.jpg";

const SignupPage = () => {
  return (
    <div className="signup">
      <div className="signup-contain">
        <div className="signup-form">
          <div>
            <h2 className="signup-title">Create Account</h2>
            <p className="signup-desc">Get started with your free account</p>
          </div>

          <form>
            <div className="flex flex-col input-item">
              <label className="label-input">Full Name</label>
              <input className="input" />
            </div>
            <div className="flex flex-col input-item">
              <label className="label-input">Email</label>
              <input className="input" type="email" />
            </div>
            <div className="flex flex-col input-item">
              <label className="label-input">Password</label>
              <input className="input" />
            </div>

            <button className="btn">Create Account</button>
          </form>
        </div>
        <div className="signup-image">
          <img alt="sign up image" src={signUpImage} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
