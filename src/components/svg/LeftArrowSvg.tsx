import { SvgComponentProps } from '../../libs/internalTypes';

const LeftArrowSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="live_chatting_ranking_icon__tzVcQ"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        d="M7 9L11 13L15 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default LeftArrowSvg;
