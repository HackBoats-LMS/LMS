import React from 'react';

interface CourseBannerProps {
  title: string;
  description: string;
  bannerColor?: string;
  hashtags?: string[];
}

const colorThemes: Record<string, { bg: string; dark: string; medium: string; darker: string; accent1: string; accent2: string }> = {
  blue: { bg: '#A5D8E5', dark: '#1F525E', medium: '#54A4B8', darker: '#0A4350', accent1: '#1496D2', accent2: '#37A5D7' },
  indigo: { bg: '#C3C8F3', dark: '#3A368F', medium: '#6259E2', darker: '#24216E', accent1: '#4338CA', accent2: '#6366F1' },
  emerald: { bg: '#B2EBC9', dark: '#0D5C46', medium: '#1BC590', darker: '#053D2F', accent1: '#059669', accent2: '#6EE7B7' },
  amber: { bg: '#FEE2B3', dark: '#8C4010', medium: '#F7B547', darker: '#5C2404', accent1: '#D97706', accent2: '#FCD34D' },
  rose: { bg: '#FBC8D1', dark: '#991D3E', medium: '#F6597A', darker: '#660822', accent1: '#E11D48', accent2: '#FDA4AF' },
};

const CourseBanner: React.FC<CourseBannerProps> = ({ title, description, bannerColor = 'blue', hashtags = [] }) => {
  const theme = colorThemes[bannerColor] || colorThemes.blue;
  
  // Unique ID for each instance to avoid clip-path interference
  const safeId = React.useMemo(() => {
    return (title || 'banner').replace(/[^\w]/g, '-').toLowerCase().substring(0, 10) + Math.floor(Math.random() * 1000);
  }, [title]);

  return (
    <div className="relative w-full aspect-[800/531] overflow-hidden select-none flex flex-col">
      {/* Background SVG Structure */}
      <div className="absolute inset-0 pointer-events-none transition-colors duration-500">
        <svg width="100%" height="100%" viewBox="0 0 800 531" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath={`url(#clip0_${safeId})`}>
            <rect width="800" height="531" fill={theme.bg}/>
            <g clipPath={`url(#clip1_${safeId})`}>
              <rect width="800" height="175" transform="translate(0 356)" fill={theme.dark}/>
              <g clipPath={`url(#clip2_${safeId})`}>
                <path d="M571.436 469.562H592.504V509.938L571.436 469.562Z" fill="white" stroke="white"/>
                <path d="M595.664 476.469V470.094L627.266 469.562V476.469H595.664Z" fill="white" stroke="white"/>
                <path d="M611.465 460.266C618.296 460.266 623.843 465.969 623.843 473.016C623.843 480.062 618.296 485.766 611.465 485.766C604.635 485.766 599.088 480.062 599.088 473.016C599.088 465.969 604.635 460.266 611.465 460.266Z" fill="white" stroke="white"/>
                <path d="M595.664 489.219V482.312H623.843L627.266 489.219H595.664Z" fill="white" stroke="white"/>
                <path d="M606.198 477.531C608.235 477.531 609.885 475.866 609.885 473.812C609.885 471.759 608.235 470.094 606.198 470.094C604.162 470.094 602.511 471.759 602.511 473.812C602.511 475.866 604.162 477.531 606.198 477.531Z" fill={theme.dark}/>
                <path d="M616.732 477.531C618.769 477.531 620.419 475.866 620.419 473.812C620.419 471.759 618.769 470.094 616.732 470.094C614.696 470.094 613.045 471.759 613.045 473.812C613.045 475.866 614.696 477.531 616.732 477.531Z" fill={theme.dark}/>
                <path d="M695.427 510.469H681.598V491.93H695.048C698.638 491.93 701.015 493.562 701.015 496.724C701.015 499.07 699.826 500.243 698.461 500.677C700.13 501.212 701.343 502.691 701.343 504.859C701.343 508.25 699.017 510.469 695.427 510.469ZM695.301 502.411H687.135V499.682H695.073C696.894 499.682 697.753 499.045 697.753 497.438C697.753 495.475 696.211 495.169 693.835 495.169H684.809V507.256H694.113C696.413 507.256 698.082 506.618 698.082 504.808C698.082 503.278 697.096 502.411 695.301 502.411ZM717.008 510.469H712.534C707.401 510.469 703.609 506.389 703.609 501.008C703.609 495.551 707.401 491.93 712.534 491.93H717.008C722.317 491.93 726.009 495.628 726.009 501.008C726.009 506.389 722.242 510.469 717.008 510.469ZM712.534 507.23H717.008C720.396 507.23 722.798 504.655 722.798 501.161C722.798 497.668 720.396 495.169 717.008 495.169H712.534C709.247 495.169 706.82 497.642 706.82 501.161C706.82 504.655 709.222 507.23 712.534 507.23ZM749.194 510.469H745.326L742.57 505.802H733.873L735.39 503.176H741.028L736.932 496.24L728.589 510.469H724.924L735.491 492.721C735.871 492.083 736.351 491.675 737.059 491.675C737.767 491.675 738.222 492.083 738.601 492.721L749.194 510.469ZM757.015 510.469H753.804V495.169H746.826V491.93H763.993V495.169H757.015V510.469ZM779.888 510.469H766.109V507.23H779.888C781.607 507.23 782.568 506.261 782.568 504.808C782.568 503.227 781.607 502.411 779.888 502.411H771.444C767.98 502.411 765.831 500.192 765.831 497.132C765.831 494.149 767.828 491.93 771.494 491.93H784.691V495.169H771.494C770.028 495.169 769.168 496.036 769.168 497.438C769.168 498.841 770.053 499.682 771.469 499.682H779.888C783.604 499.682 785.601 501.442 785.601 505.037C785.601 508.148 783.731 510.469 779.888 510.469Z" fill="white"/>
                <path d="M613.714 510.545H610.504V502.487H601.251V499.606H610.504V491.93H613.714V510.545ZM598.925 510.545H595.714V491.93H598.925V510.545ZM639.929 510.469H636.06L633.305 505.802H624.608L626.125 503.176H631.763L627.667 496.24L619.324 510.469H615.658L626.226 492.721C626.605 492.083 627.085 491.675 627.793 491.675C628.501 491.675 628.956 492.083 629.336 492.721L639.929 510.469ZM657.817 510.469H647.856C642.724 510.469 638.932 506.389 638.932 501.008C638.932 495.551 642.724 491.93 647.856 491.93H657.817V495.169H647.856C644.57 495.169 642.143 497.642 642.143 501.161C642.143 504.655 644.545 507.23 647.856 507.23H657.817V510.469ZM680.472 510.469H675.568L665.278 502.309C664.722 501.875 664.621 501.467 664.621 500.957C664.621 500.396 664.772 499.988 665.43 499.478L675.163 491.93H680.093L668.059 500.983L680.472 510.469ZM663.635 510.469H660.424V491.93H663.635V510.469Z" fill="white"/>
              </g>
              <rect width="175" height="175" transform="translate(0 356)" fill={theme.bg}/>
              {/* Official Bot SVG centered and scaled to 0.5x */}
              <g transform="translate(20 390.25) scale(0.5)">
                <g opacity="0.34">
                  <path d="M0.5 157.819V96.7276L290.5 91.6367V157.819H0.5Z" fill={theme.accent1} stroke={theme.accent1}/>
                  <path d="M145.5 0.5C209.255 0.500004 261 56.0839 261 124.728C261 193.371 209.255 248.954 145.5 248.954C81.7448 248.954 30.0002 193.371 30.0001 124.728C30.0001 56.0839 81.7447 0.5 145.5 0.5Z" fill={theme.accent1} stroke={theme.accent1}/>
                  <path d="M0.5 280V213.818H259.083L290.5 280H0.5Z" fill={theme.accent1} stroke={theme.accent1}/>
                  <ellipse cx="97.1667" cy="132.364" rx="33.8333" ry="35.6364" fill="white"/>
                  <ellipse cx="193.833" cy="132.364" rx="33.8333" ry="35.6364" fill="white"/>
                </g>
              </g>
              <g clipPath={`url(#clip3_${safeId})`}>
                <rect width="800" height="25" transform="translate(0 356)" fill="white"/>
                <rect width="60" height="60" transform="translate(0 356)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(60 356)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(120 356)" fill={theme.dark}/>
                <rect width="60" height="60" transform="translate(180 356)" fill={theme.dark}/>
                <rect width="60" height="60" transform="translate(240 356)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(300 356)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(360 356)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(420 356)" fill={theme.dark}/>
                <rect width="60" height="60" transform="translate(480 356)" fill={theme.dark}/>
                <rect width="60" height="60" transform="translate(540 356)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(600 356)" fill={theme.dark}/>
                <rect width="60" height="60" transform="translate(660 356)" fill={theme.dark}/>
                <rect width="60" height="60" transform="translate(720 356)" fill={theme.bg}/>
                <rect width="60" height="60" transform="translate(780 356)" fill={theme.dark}/>
              </g>
              <g clipPath={`url(#clip4_${safeId})`}>
                <rect width="625" height="25" transform="translate(175 381)" fill="white"/>
                <rect width="60" height="60" transform="translate(175 381)" fill={theme.darker}/>
                <rect width="60" height="60" transform="translate(235 381)" fill={theme.darker}/>
                <rect width="60" height="60" transform="translate(295 381)" fill={theme.darker}/>
                <rect width="60" height="60" transform="translate(355 381)" fill={theme.dark}/>
                <rect width="60" height="60" transform="translate(415 381)" fill={theme.dark}/>
                <rect width="60" height="60" transform="translate(475 381)" fill={theme.bg}/>
                <rect width="60" height="60" transform="translate(535 381)" fill={theme.bg}/>
                <rect width="60" height="60" transform="translate(595 381)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(655 381)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(715 381)" fill={theme.medium}/>
                <rect width="60" height="60" transform="translate(775 381)" fill={theme.bg}/>
              </g>
            </g>
          </g>
          <defs>
            <clipPath id={`clip0_${safeId}`}><rect width="800" height="531" fill="white"/></clipPath>
            <clipPath id={`clip1_${safeId}`}><rect width="800" height="175" fill="white" transform="translate(0 356)"/></clipPath>
            <clipPath id={`clip2_${safeId}`}><rect width="217" height="51" fill="white" transform="translate(571 460)"/></clipPath>
            <clipPath id={`clip3_${safeId}`}><rect width="800" height="25" fill="white" transform="translate(0 356)"/></clipPath>
            <clipPath id={`clip4_${safeId}`}><rect width="625" height="25" fill="white" transform="translate(175 381)"/></clipPath>
          </defs>
        </svg>
      </div>

      {/* Dynamic Text Overlay */}
      <div className="absolute inset-0 p-[8%] pt-[10%] flex flex-col justify-start z-10 pointer-events-none">
        <h2 className="text-[clamp(1.5rem,7vw,1.2rem)] font-bold text-gray-950 leading-[1] mb-[3%] line-clamp-1 tracking-tight">
          {title}
        </h2>
        <p className="text-[clamp(0.7rem,2.4vw,0.8rem)] text-gray-800 leading-normal font-semibold max-w-[80%] line-clamp-3 opacity-90">
          {description}
        </p>

      </div>
    </div>
  );
};

export default CourseBanner;
