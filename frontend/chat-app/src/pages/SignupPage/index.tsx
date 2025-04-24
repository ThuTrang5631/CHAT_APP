const SignupPage = () => {
  return (
    <div className="signup">
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
  );
};

export default SignupPage;
