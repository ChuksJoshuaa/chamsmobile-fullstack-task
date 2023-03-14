const Footer = () => {
  return (
    <div className="footer mt-5 bg-light">
      <h5 className="text-capitalize text-success">
        &copy; {new Date().getFullYear()}
        <span className="text-success"> Chamsmobile. </span>
      </h5>{" "}
      <h5 className="fs-8 fw-medium text-capitalize">All rights reserved</h5>
    </div>
  );
};

export default Footer;
