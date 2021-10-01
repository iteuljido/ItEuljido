import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { getCLS, getFCP, getFID, getLCP, getTTFB, Metric } from "web-vitals";

import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";

import wrapper from "store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider {...{ theme }}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);

const logDelta = ({ name, id, delta }: Metric) => {
  console.log(`${name} matching ID ${id} changed by ${delta}`);
};

export const reportWebVitals = (metric: Metric) => {
  switch (metric.name) {
    case "FCP":
      getFCP(logDelta);
      break;
    case "LCP":
      getLCP(logDelta);
      break;
    case "CLS":
      getCLS(logDelta);
      break;
    case "FID":
      getFID(logDelta);
      break;
    case "TTFB":
      getTTFB(logDelta);
      break;
    default:
      break;
  }
};
