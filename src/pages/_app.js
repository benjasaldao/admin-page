import Layout from "containers/Layout";
import { ProviderAuth } from "@hooks/useAuth";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProviderAuth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProviderAuth>
    </>
  );
}

export default MyApp;
