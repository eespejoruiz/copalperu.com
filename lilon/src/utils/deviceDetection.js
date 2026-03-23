// Utility functions for device detection

/**
 * Detects if the current device is iOS (iPhone, iPad, iPod)
 * @returns {boolean} true if iOS device, false otherwise
 */
export const isIOS = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for iOS devices using multiple methods
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  
  // Traditional iOS detection
  const isIOSUserAgent = /ipad|iphone|ipod/.test(userAgent);
  
  // Modern iPad detection (iOS 13+)
  const isModernIPad = platform === 'macintel' && navigator.maxTouchPoints > 1;
  
  // Additional iOS detection methods
  const isIOSPlatform = /iphone|ipad|ipod/.test(platform);
  
  // Check for iOS in vendor string
  const isIOSVendor = navigator.vendor && navigator.vendor.toLowerCase().includes('apple');
  
  // Safari on iOS specific check
  const isSafariIOS = /safari/.test(userAgent) && /version/.test(userAgent) && (isIOSUserAgent || isModernIPad);
  
  return isIOSUserAgent || isModernIPad || isIOSPlatform || (isIOSVendor && (isIOSUserAgent || isModernIPad)) || isSafariIOS;
};

/**
 * Detects if the current device is a mobile device
 * @returns {boolean} true if mobile device, false otherwise
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Gets the appropriate background styles for parallax sections
 * iOS devices don't support background-attachment: fixed properly, so we use static backgrounds
 * @param {string} imageUrl - The background image URL
 * @param {object} options - Additional styling options
 * @returns {object} CSS styles object
 */
export const getParallaxStyles = (imageUrl, options = {}) => {
  const baseStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: options.position || 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: options.opacity || 0.8
  };

  // For iOS devices, use static background instead of fixed
  const isiOSDevice = isIOS();
  console.log('Device detection - isIOS:', isiOSDevice, 'UserAgent:', navigator.userAgent);
  
  if (isiOSDevice) {
    console.log('iOS detected - using static background');
    return {
      ...baseStyles,
      backgroundAttachment: 'scroll',
      // Force static positioning for iOS
      transform: 'translateZ(0)', // Force hardware acceleration
      willChange: 'auto' // Optimize for static content
    };
  }

  // For other devices, use parallax effect
  console.log('Non-iOS device - using parallax background');
  return {
    ...baseStyles,
    backgroundAttachment: 'fixed'
  };
};