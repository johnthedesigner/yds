import Image from "next/image";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";

const Index = () => {
  return (
    <>
      <NewSeo page={pages.home} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}>
        <div
          style={{
            flex: 1,
            minWidth: "500px",
            background: "url(/blizzard-min.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        />
        <div
          style={{
            flex: 1,
            minWidth: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            boxSizing: "border-box",
          }}>
          <div style={{ width: "30rem", maxWidth: "80vw" }}>
            <div>
              <Image
                className="logo--desktop"
                src="/logo-header.svg"
                alt="YDS Logo"
                width="240"
                height="216"
              />
            </div>
            <div style={{ padding: ".5rem" }}>
              <h1
                style={{
                  fontSize: "2rem",
                }}>
                2021–2024
              </h1>
              <p>Thank you to everyone in our dahlia community!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
