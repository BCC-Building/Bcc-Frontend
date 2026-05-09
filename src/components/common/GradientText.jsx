const GradientText = ({ children, className = "", as = "span" }) => {
  const Tag = as;

  return (
    <Tag className={`gradient-text ${className}`}>
      {children}
    </Tag>
  );
};

export default GradientText;
