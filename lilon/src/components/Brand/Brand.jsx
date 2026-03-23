import PropTypes from 'prop-types';
const Brand = ({ brandLogo, alt = "Brand Partner" }) => {
  return (
    <div className="brand-box">
      <img src={brandLogo} title="" alt={alt} />
    </div>
  )
}
Brand.propTypes = {
  brandLogo: PropTypes.string,
  alt: PropTypes.string
}

export default Brand;
