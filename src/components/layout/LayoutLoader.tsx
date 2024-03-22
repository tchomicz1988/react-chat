export const LayoutLoader = () => {
  return (
    <svg
      className="absolute m-auto inset-0"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        fill="none"
        stroke="#255aeb"
        strokeWidth="8"
        strokeDasharray="42.765 42.765"
        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0;256.58892822265625"
        />
      </path>
    </svg>
  )
}
