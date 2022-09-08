const AuthBlock = ({
  children,
  handleSubmit,
  title,
  errorMessage,
  successMessage,
  Footer,
  submitText,
}) => {
  return (
    <div className="auth-block__wrapper">
      <div className="auth-block">
        <div className="auth-block__header">
          <h1 className="auth-block__title">{title}</h1>
        </div>
        <div className="auth-block__body">
          {successMessage && (
            <div className="auth-block__success-message">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="auth-block__error-message">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            {children}
            <button className="auth-block__submit-button" type="submit">
              {submitText}
            </button>
          </form>
        </div>
        {Footer && (
          <div className="auth-block__footer">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthBlock;
