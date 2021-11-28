const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <strong>Loading</strong>
      <div className="spinner-border text-black ms-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
