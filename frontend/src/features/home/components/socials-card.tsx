import { FaYoutube, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

const SocialsCard = () => {
  return (
    <div className="drop-shadow-md rounded-sm bg-white">
      <header className="h-12 bg-aff-blue rounded-t-sm">
        <h1 className="px-4 py-3 font-semibold text-white">CONNECT WITH US</h1>
      </header>
      <section className="flex flex-wrap justify-between p-4 px-4">
        <div className="flex">
          <FaYoutube color="red" className="my-auto mr-[.4rem]" size="1.3rem" />
          <a
            target="_blank"
            href="https://www.youtube.com/@americanfootballfederation"
            className="my-auto"
          >
            Youtube
          </a>
        </div>
        <div className="flex text-neutral-400">
          <FaTwitter
            color="#1DA1F2"
            className="my-auto mr-[.4rem]"
            size="1.3rem"
          />
          <span className="my-auto">Twitter</span>
        </div>
        <div className="flex text-neutral-400">
          <FaInstagram
            color="#d62976"
            className="my-auto mr-[.4rem]"
            size="1.3rem"
          />
          <a href="https://instagram.com" className="my-auto">
            Instagram
          </a>
        </div>
        <div className="flex">
          <FaTiktok
            color="black"
            className="my-auto mr-[.4rem]"
            size="1.3rem"
          />
          <a
            href="https://www.tiktok.com/@americanfootballfed"
            target="_blank"
            className="my-auto"
          >
            TikTok
          </a>
        </div>
      </section>
    </div>
  );
};

export default SocialsCard;
