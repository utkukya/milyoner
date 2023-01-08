import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Baslangic from "./components/Baslangic";
import Sayac from "./components/Sayac";
import Bilgiler from "./components/Bilgiler";

function App() {
  const [kullaniciAdi, setKullaniciAdi] = useState(null);
  const [süre, setSure] = useState(false);
  const [soruNumarasi, setSoruNumarasi] = useState(1);
  const [kazanc, setKazanc] = useState("0 TL");

  const data = [
    {
      id: 1,
      soru: "Rolex hangi alanda uzmanlaşan bir şirkettir?",
      cevap: [
        {
          yazi: "Telefon",
          dogru: false,
        },
        {
          yazi: "Saat",
          dogru: true,
        },
        {
          yazi: "Yemek",
          dogru: false,
        },
        {
          yazi: "Kozmetik",
          dogru: false,
        },
      ],
    },
    {
      id: 2,
      soru: "`Facebook` hangi yıl piyasaya sürülmüştür?",
      cevap: [
        {
          yazi: "2004",
          dogru: true,
        },
        {
          yazi: "2005",
          dogru: false,
        },
        {
          yazi: "2006",
          dogru: false,
        },
        {
          yazi: "2007",
          dogru: false,
        },
      ],
    },
    {
      id: 3,
      soru: "Harry Potter karakterine hayat veren oyuncu kimdir?",
      cevap: [
        {
          yazi: "Johnny Deep",
          dogru: false,
        },
        {
          yazi: "Leonardo Di Caprio",
          dogru: false,
        },
        {
          yazi: "Denzel Washington",
          dogru: false,
        },
        {
          yazi: "Daniel Red Cliff",
          dogru: true,
        },
      ],
    },
  ];

  const paraPiramidi = useMemo(
    () =>
      [
        { id: 1, miktar: "100 TL" },
        { id: 2, miktar: "200 TL" },
        { id: 3, miktar: "300 TL" },
        { id: 4, miktar: "500 TL" },
        { id: 5, miktar: "1.000 TL" },
        { id: 6, miktar: "2.000 TL" },
        { id: 7, miktar: "4.000 TL" },
        { id: 8, miktar: "8.000 TL" },
        { id: 9, miktar: "16.000 TL" },
        { id: 10, miktar: "32.000 TL" },
        { id: 11, miktar: "64.000 TL" },
        { id: 12, miktar: "125.000 TL" },
        { id: 13, miktar: "250.000 TL" },
        { id: 14, miktar: "500.000 TL" },
        { id: 15, miktar: "1.000.000 TL" },
      ].reverse(),
    []
  );

  useEffect(() => {
    soruNumarasi > 1 &&
      setKazanc(paraPiramidi.find((m) => m.id === soruNumarasi - 1).miktar);
  }, [soruNumarasi, paraPiramidi]);

  return (
    <div className="app">
      {!kullaniciAdi ? (
        <Baslangic setKullaniciAdi={setKullaniciAdi} />
      ) : (
        <>
          <div className="main">
            {süre ? (
              <h1 className="sonYazi">Kazandığınız ödül: {kazanc}</h1>
            ) : (
              <>
                <div className="ust">
                  <div className="sayac">
                    <Sayac setSure={setSure} soruNumarasi={soruNumarasi} />
                  </div>
                </div>
                <div className="asagi">
                  <Bilgiler
                    data={data}
                    soruNumarasi={soruNumarasi}
                    setSoruNumarasi={setSoruNumarasi}
                    setSure={setSure}
                  />
                </div>
              </>
            )}
          </div>
          <div className="piramid">
            <ul className="paraListesi">
              {paraPiramidi.map((m) => (
                <li
                  className={
                    soruNumarasi === m.id
                      ? "paraListesiItem aktif"
                      : "paraListesiItem"
                  }
                >
                  <span className="paraListesiNumara">{m.id}</span>
                  <span className="paraListesiMiktar">{m.miktar}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
