import { SvgComponentProps } from '@/libs/internalTypes';

const WhiteHamburgerSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <g
        fillOpacity="0.8824"
        fill="#E0E0E0"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      >
        <g transform="scale(5.12,5.12)">
          <path d="M0,9v2h50v-2zM0,24v2h50v-2zM0,39v2h50v-2z"></path>
        </g>
      </g>
    </svg>
  );
};

export default WhiteHamburgerSvg;
