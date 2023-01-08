import { useEffect, useState } from "react";

export default function Sayac({ setSure, soruNumarasi }) {
  const [geriSayim, setGeriSayim] = useState(30);

  useEffect(() => {
    if (geriSayim === 0) return setSure(true);
    const interval = setInterval(() => {
      setGeriSayim((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [geriSayim, setGeriSayim]);

  useEffect(() => {
    setGeriSayim(30);
  }, [soruNumarasi]);
  return geriSayim;
}
