interface FormErrorProps {
    errorMessage: string;
  }
  
  const FormError: React.FC<FormErrorProps> = ({ errorMessage }) => {
    return (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    );
  };
  
  export default FormError;

  