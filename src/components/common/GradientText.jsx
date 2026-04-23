const GradientText = ({ children, className = "", as: Component = "span" }) => {
  return (
    <Component className={`gradient-text ${className}`}>
      {children}
    </Component>
  );
};

export default GradientText;