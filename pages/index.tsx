import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import GradientLayout from "../components/gradientLayout";

const Home = () => {
  return (
    <GradientLayout
      color="green"
      subtitle={"profile"}
      title="Scott Moss"
      description={`15 Public playlists`}
      image="https://dl.dropboxusercontent.com/s/8tyfzyb3b34ouxd/Openhttps://dl.dropboxusercontent.com/s/8tyfzyb3b34ouxd/Open"
    >
      <div>Home page</div>
    </GradientLayout>
  );
};

export default Home;
