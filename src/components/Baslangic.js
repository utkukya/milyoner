import { useRef } from "react";

export default function Baslangic({ setKullaniciAdi }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setKullaniciAdi(inputRef.current.value);
  };

  return (
    <div className="basla">
      <input className="baslaInput" placeholder="İsim Giriniz" ref={inputRef} />
      <button className="baslaButonu" onClick={handleClick}>
        Başla
      </button>
    </div>
  );
}
