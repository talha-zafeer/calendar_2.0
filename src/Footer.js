const Footer = () => {
  return (
    <>
      <div className="">
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "black" }}
        >
          <section
            className="d-flex justify-content-between p-4"
            style={{ backgroundColor: "#1c2331" }}
          >
            <div className="me-5">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="facebook.com" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="twitter.com" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="google.com" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="instagram.com" className="text-white me-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="linkedin.com" className="text-white me-4">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="github.com" className="text-white me-4">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">To-Do Events</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Products</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-white">
                      Dummy
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Yikes
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      BrandFlow
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Bla Bla
                    </a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-white">
                      Your Account
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Become an Affiliate
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Shipping Rates
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Help
                    </a>
                  </p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <i className="fas fa-home mr-3"></i> Lahore, JT 10012, PK
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3"></i> info@example.com
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3"></i> + 92 336 248 6167
                  </p>
                  <p>
                    <i className="fas fa-print mr-3"></i> + 92 336 248 6167
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2020 Copyright :
            <a className="text-white px-3" href="gigalabs.co">
              iCalendar
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
