import { useEffect, useState } from "react";
import useSound from "use-sound";
import oynatSes from "../sounds/play.mp3";
import dogruSes from "../sounds/correct.mp3";
import yanlisSes from "../sounds/wrong.mp3";

export default function Bilgiler({
  data,
  soruNumarasi,
  setSoruNumarasi,
  setSure,
}) {
  const [soru, setSoru] = useState(null);
  const [secilenCevap, setSecilenCevap] = useState(null);
  const [className, setClassName] = useState("answer");
  const [basla] = useSound(oynatSes);
  const [dogruCevap] = useSound(dogruSes);
  const [yanlisCevap] = useSound(yanlisSes);

  useEffect(() => {
    basla();
  }, [basla]);

  useEffect(() => {
    setSoru(data[soruNumarasi - 1]);
  }, [data, soruNumarasi]);

  const gecikme = (saniye, callback) => {
    setTimeout(() => {
      callback();
    }, saniye);
  };

  const handleClick = (a) => {
    setSecilenCevap(a);
    setClassName("cevap aktif");
    gecikme(3000, () => {
      setClassName(a.dogru ? "cevap dogru" : "cevap yanlis");
    });

    gecikme(5000, () => {
      if (a.dogru) {
        dogruCevap();
        gecikme(1000, () => {
          setSoruNumarasi((onceki) => onceki + 1);
          setSecilenCevap(null);
        });
      } else {
        yanlisCevap();
        gecikme(1000, () => {
          setSure(true);
        });
      }
    });
  };
  return (
    <div className="bilgi">
      <div className="soru">{soru?.soru}</div>
      <div className="cevaplar">
        {soru?.cevap.map((a) => (
          <div
            className={secilenCevap === a ? className : "cevap"}
            onClick={() => !secilenCevap && handleClick(a)}
          >
            {a.yazi}
          </div>
        ))}
      </div>
    </div>
  );
}
