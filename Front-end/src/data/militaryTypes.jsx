import FUZ from "../Img/FUZ.jpeg";
import FUZ2 from "../Img/FUZ2.jpeg";
import MED from "../Img/MED.jpeg";
import MED2 from "../Img/MED2.jpeg";
import ATR from "../Img/ATR.jpeg";
import ATR2 from "../Img/ATR2.jpeg";
import ENG from "../Img/ENG.jpeg";
import ENG2 from "../Img/ENG2.jpeg";

export const tiposMilitares = {
  homens: [
    {
      id: 1,
      name: "Fuzileiro",
      image: FUZ,
      gender: "homens",
      description: "Soldado especializado em operações terrestres e aquáticas.",
    },
    {
      id: 2,
      name: "Atirador",
      image: ATR,
      gender: "homens",
      description:
        "Especialista em disparos de precisão e combate à distância.",
    },
    {
      id: 3,
      name: "Paramédico",
      image: MED,
      gender: "homens",

      description:
        "Responsável pelo suporte médico e resgate no campo de batalha.",
    },
    {
      id: 4,
      name: "Engenheiro",
      image: ENG,
      gender: "homens",
      description:
        "Especialista em construção, manutenção e desativação de armadilhas.",
    },
    {
      id: 5,
      name: "Fuzileiro",
      image: FUZ2,
      gender: "mulheres",
      description: "Soldada especializada em operações terrestres e aquáticas.",
    },
    {
      id: 6,
      name: "Atiradora",
      image: ATR2,
      gender: "mulheres",
      description:
        "Especialista em disparos de precisão e combate à distância.",
    },
    {
      id: 7,
      name: "Paramédica",
      image: MED2,
      gender: "mulheres",
      description:
        "Responsável pelo suporte médico e resgate no campo de batalha.",
    },
    {
      id: 8,
      name: "Engenheira",
      image: ENG2,
      gender: "mulheres",
      description:
        "Especialista em construção, manutenção e desativação de armadilhas.",
    },
  ],
};
