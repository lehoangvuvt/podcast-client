import { FacebookShareButton } from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  itemURL: string;
  color?: string;
  fontSize?: string;
};

const SocialBar: React.FC<Props> = ({
  itemURL,
  color = "rgba(0,0,0,0.8)",
  fontSize = "0.75rem",
}) => {
  return (
    <div className="w-full flex flex-row gap-[5px]">
      <FacebookShareButton url={itemURL}>
        <div
          style={{ color, fontSize }}
          className="flex flex-row gap-[8px] items-center 
        font-bold
         px-[15px] py-[6px]
         cursor-pointer
         transition-all uppercase
        rounded-3xl hover:bg-[rgba(0,0,0,0.08)]
        "
        >
          <FacebookIcon /> Share
        </div>
      </FacebookShareButton>

      <div
        style={{ color, fontSize }}
        onClick={() => {
          window.navigator.clipboard.writeText(itemURL);
          toast("Link has been copied");
        }}
        className="flex flex-row gap-[8px] items-center 
        font-bold
         px-[15px] py-[6px]
         cursor-pointer
         transition-all uppercase
        rounded-3xl hover:bg-[rgba(0,0,0,0.08)]
        "
      >
        <InsertLinkIcon /> Copy link
      </div>
      <ToastContainer
        hideProgressBar
        autoClose={500}
        transition={Flip}
        theme="dark"
        style={{
          position: "fixed",
          zIndex: 1000,
          top: "15%",
          left: "calc(50% - 80px)",
        }}
      />
    </div>
  );
};

export default SocialBar;
