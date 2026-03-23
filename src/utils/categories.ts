// import foodSvg from "../assets/food.svg"
// import othersSvg from "../assets/others.svg"
// import servicesSvg from "../assets/services.svg"
// import transportSvg from "../assets/transport.svg"
// import accommomdationSvg from "../assets/accommodation.svg"


export const CATEGORIES = {
    food: {
        name: "Instalação de Rede	",
        // icon: foodSvg,
    },
      others: {
        name: "Outros",
        // icon: othersSvg,
    },
      services: {
        name: "Recuperação de Dados	",
        // icon: servicesSvg,
    },
      transport: {
        name: "Manutenção de Hardware	",
        // icon: transportSvg,
    },
      accommodation: {
        name: "Suporte de Software	",
        // icon: accommomdationSvg,
    },
}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<
keyof typeof CATEGORIES
>