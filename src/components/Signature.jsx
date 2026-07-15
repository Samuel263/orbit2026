import { FaHeart } from "react-icons/fa";

export default function Signature() {
  return (
    <footer className="w-full py-6 flex justify-center items-center">
      <p className="flex items-center gap-2 text-sm text-gray-500">
        Crafted with{" "}
        <FaHeart
          className="inline"
          style={{ color: "#EC4392" }}
        />{" "}
        by{" "}
        <span className="font-semibold text-gray-700">
          Orbit
        </span>
      </p>
    </footer>
  );
}
