/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';

const GLITCH_CHARS = '`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/'.split('');

const ReadableChar = styled.span``;

const GlitchyChar = styled.span``;

const GlitchyText = ({ children, ...props }) => {
  return (
    <h1 {...props} className={`glitchy-text ${props.className}`}>
      <ReadableChar className="glitchy-text__char--readable">
        {children}
      </ReadableChar>
      {children.split('').map((char: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, idx: any) => {
        const charStyle = {
          '--count': Math.random() * 5 + 1,
        };
        for (let i = 0; i < 10; i++) {
          charStyle[`--char${i}`] = `"${
            GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          }"`;
        }
        return (
          <GlitchyChar
            className="glitchy-text__char"
            aria-hidden={true}
            data-char={char}
            key={`glitch-char--${idx}`}
            style={charStyle}>
            {char}
          </GlitchyChar>
        );
      })}
    </h1>
  );
};

const Logo = ({ className }) => {
  return (
    <svg
      className={`bear-logo ${className}`}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1.34105 0 0 1.34105 -51.157 -1049.694)">
        <path
          d="M242.822 893.869c0 61.251-41.365 106.284-94.67 106.284-53.306 0-90.974-45.033-90.974-106.284 0-61.252 37.668-85.951 90.973-85.951 53.306 0 94.67 24.699 94.67 85.95z"
          fill="#803300"
        />
        <path
          d="M211.925 958.105c0 19.907-28.138 38.819-62.85 38.819-34.71 0-61-18.912-61-38.82 0-19.907 26.29-33.273 61-33.273 34.712 0 62.85 13.366 62.85 33.274z"
          fill="#e9c6af"
        />
        <path d="M179.114 931.763c0 7.657-19.04 24.493-30.27 24.493s-32.117-16.836-32.117-24.493 20.888-12.477 32.118-12.477 30.27 4.82 30.27 12.477z" />
        <ellipse
          ry="23.111"
          rx="23.762"
          cy="827.682"
          cx="68.304"
          fill="#803300"
        />
        <path
          d="M84.784 826.317a16.549 16.095 0 00-16.48-14.731 16.549 16.095 0 00-16.548 16.095 16.549 16.095 0 0016.548 16.096 16.549 16.095 0 001.132-.039c.815-1.337 1.582-2.727 2.471-3.983a65.703 65.703 0 015.055-6.283 65.597 65.597 0 015.713-5.548c.668-.576 1.417-1.058 2.109-1.607z"
          fill="#e9c6af"
        />
        <ellipse
          transform="scale(-1 1)"
          cx="-231.243"
          cy="827.682"
          rx="23.762"
          ry="23.111"
          fill="#803300"
        />
        <path
          d="M214.764 826.317a16.549 16.095 0 0116.48-14.731 16.549 16.095 0 0116.548 16.095 16.549 16.095 0 01-16.549 16.096 16.549 16.095 0 01-1.131-.039c-.816-1.337-1.582-2.727-2.472-3.983a65.703 65.703 0 00-5.055-6.283 65.597 65.597 0 00-5.712-5.548c-.67-.576-1.418-1.058-2.11-1.607z"
          fill="#e9c6af"
        />
        <path
          d="M147.731 815.358c-13.396 0-26.022 1.079-37.671 3.334v11.353c11.649-2.255 24.275-3.334 37.671-3.334 15.104 0 29.459 1.373 42.667 4.256v-11.355c-13.208-2.883-27.564-4.254-42.667-4.254z"
          fill="red"
        />
        <path
          d="M165.195 816.013a15.875 7.813 0 014.43 5.412 15.875 7.813 0 01-5.414 5.863c9.116.653 17.878 1.866 26.186 3.68v-11.356c-8.007-1.748-16.44-2.931-25.202-3.6z"
          fill="#e50000"
        />
        <path
          d="M148.387 789.038c-43.49 0-75.817 18.34-83.229 62.715 12.322-10.516 27.524-17.553 44.903-21.51 0 0-2.734-13.778 10.25-16.029 12.983-2.25 14.025-4 27.421-4 15.103 0 16.422.44 30.666 4 14.245 3.561 12 17.113 12 17.113 17.218 4.421 32.483 11.864 44.9 22.71-7.275-46.03-42.684-64.999-86.911-64.999z"
          fill="#1a1a1a"
        />
        <path
          className="bear__tear-stream"
          d="M190.665 893.336v96.221c8.24-4.43 15.761-10.15 22.37-16.971v-79.25h-22.37zM86.056 893.336v80.399c6.546 6.885 14.056 12.592 22.37 16.92v-97.32h-22.37z"
        />
        <path
          className="bear__brows"
          d="M96.601 864.041a21.271 21.271 0 01-6.78 15.572 21.271 21.271 0 01-16.02 5.644M203.53 864.041a21.271 21.271 0 006.78 15.572 21.271 21.271 0 0016.02 5.644"
          fill="none"
          strokeWidth="2.983"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          className="bear__eye bear__eye--left"
          r="11.185"
          cy="894.081"
          cx="97.242"
        />
        <circle
          className="bear__eye bear__eye--right"
          r="11.185"
          cx="201.851"
          cy="894.081"
        />
        <g className="bear__shades">
          <path d="M77.29 854.608c-6.508-.07-13.363.182-22.8 2.131l-14.318 2.769 2.045 10.56c7.09-3.31 14.113-6.28 22.229-7.816a71.67 71.67 0 0111.72-1.255l-1.621-6.389zm142.103 0c6.51-.07 13.363.182 22.8 2.131l14.318 2.769-2.045 10.56c-7.09-3.31-14.113-6.28-22.229-7.816a71.671 71.671 0 00-11.72-1.255l1.621-6.389z" />
          <path
            className="bear__shades-glass"
            d="M84.236 854.593a110.505 110.505 0 0136.64-4.057c9.767.46 19.053 1.963 28.05 4.057 3.038-1.068 6.716-1.705 10.59-1.706 5.687 0 10.894 1.274 16.684 2.783-8.536-10.813-21.334-16.598-37.856-16.598-11.503 0-23.866 3.634-37.27 13.42a60.248 60.248 0 00-8.656 7.76c-6.023-1.836-11.184-3.659-17.372-4.658 4.398-5.575 10.178-10.17 17.19-13.333a49.385 49.385 0 0123.81-4.837c9.537 0 17.864 2.012 25.352 7.843 10.707-5.957 22.693-7.843 35.367-7.843 8.91 0 17.506 1.733 25.424 5.088 8.864 3.713 16.86 9.197 22.29 16.14 3.563 4.448 6.21 9.565 8.438 14.816 2.697 6.231 4.263 12.529 4.517 18.92-.007.083.007.159 0 .242.17 4.616-3.798 11.313-9.586 16.542-5.788 5.23-12.907 9.108-19.586 12.021-6.678 2.912-12.863 5.177-17.624 6.637-2.763.83-4.88 1.305-6.22 1.305h-45.732c-1.34 0-3.457-.475-6.22-1.305-4.761-1.46-10.946-3.725-17.624-6.637-6.679-2.913-13.798-6.79-19.586-12.021-5.788-5.23-9.756-11.926-9.586-16.542-.007-.083.007-.159 0-.242.255-6.391 1.82-12.689 4.518-18.92 2.227-5.251 4.874-10.368 8.437-14.816a48.935 48.935 0 011.622-1.88c5.79-1.509 11.539-2.663 17.274-3.29z"
          />
          <g className="bear__shades-reflection">
            <path
              fill="white"
              d="M78.117 888.207c1.024 4.31 7.67 7.493 15.594 7.493 5.23 0 9.97-1.463 12.97-3.73 1.222-.93 2.51-2.02 3.687-3.205 1.512 3.463 3.327 5.502 5.373 6.055 5.18 1.347 15.403-3.265 19.113-11.11 2.146-4.71 2.523-10.926 1.526-16.904a48.08 48.08 0 00-1.064-4.905c-.04-.146-.08-.288-.121-.428-4.097 2.626-9.268 4.605-15.49 5.58-7.505 1.133-15.657.69-23.64-.206-8.018-.898-15.65-2.245-22.113-3.916-3.683 4.286-6.402 9.3-7.798 14.45-1.913 7.284-.36 14.184 3.963 17.725z"
            />
            <path
              fill="white"
              d="M213.74 888.207c-1.024 4.31-7.67 7.493-15.594 7.493-5.23 0-9.97-1.463-12.97-3.73-1.222-.93-2.51-2.02-3.687-3.205-1.512 3.463-3.327 5.502-5.373 6.055-5.18 1.347-15.403-3.265-19.113-11.11-2.146-4.71-2.523-10.926-1.526-16.904.257-1.45.63-3.063 1.064-4.905.04-.146.08-.288.121-.428 4.097 2.626 9.268 4.605 15.49 5.58 7.505 1.133 15.657.69 23.64-.206 8.018-.898 15.65-2.245 22.113-3.916 3.683 4.286 6.402 9.3 7.798 14.45 1.913 7.284.36 14.184-3.963 17.725z"
            />
          </g>
        </g>
        <circle
          className="bear__tear"
          cx="217.394"
          cy="940.992"
          r="7.264"
          fill="#48e5e2"
        />
      </g>
    </svg>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #181818;
  color: #ffffff;
  text-align: center;
  flex-direction: column;

  .glitchy-text {
    font-size: 8rem;
    font-weight: bold;
    position: relative;
    display: inline-block;
    margin: 0;

    .glitchy-text__char--readable {
      position: absolute;
      top: 0;
      left: 0;
    }

    .glitchy-text__char {
      position: absolute;
      top: 0;
      left: 0;
      animation: glitch 2s infinite;
    }

    @keyframes glitch {
      0% {
        opacity: 1;
        text-shadow: -3px -3px 0 red, 3px 3px 0 blue;
      }
      20% {
        opacity: 1;
        text-shadow: 3px -3px 0 red, -3px 3px 0 blue;
      }
      40% {
        opacity: 1;
        text-shadow: -3px 3px 0 red, 3px -3px 0 blue;
      }
      60% {
        opacity: 0;
        text-shadow: 3px 3px 0 red, -3px -3px 0 blue;
      }
      80% {
        opacity: 1;
        text-shadow: -3px -3px 0 red, 3px 3px 0 blue;
      }
      100% {
        opacity: 0;
        text-shadow: 3px -3px 0 red, -3px 3px 0 blue;
      }
    }
  }

  .bear-logo {
    width: 150px;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .glitchy-text {
      font-size: 4rem;
    }

    .bear-logo {
      width: 100px;
    }
  }
`;

const CodeMessage = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const FourOhFour = () => {
  useEffect(() => {
    const handleResize = () => {
      const chars = document.querySelectorAll(".glitchy-text__char");

      chars.forEach((char) => {
        const top = Math.random() * 4 - 2;
        const left = Math.random() * 4 - 2;
        char.style.transform = `translate(${left}px, ${top}px)`;
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderGlitchyText = (text) =>
    text.split("").map((char, index) => (
      <span className="glitchy-text__char" key={index}>
        {char}
      </span>
    ));

  return (
    <Container>
      <div className="glitchy-text">
        <span className="glitchy-text__char--readable">404</span>
        {renderGlitchyText("404")}
      </div>
      <BearLogo />
      <CodeMessage>Oops! Page not found.</CodeMessage>
    </Container>
  );
};

export default FourOhFour;
