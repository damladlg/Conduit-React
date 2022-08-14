const FormErrorComponent = (props) => {
  return (
    props.errorMessage && (
      <span className="Error" style={{ color: "red" }}>
        {props.errorMessage}
      </span>
    )
  );
};

export default FormErrorComponent;
