// Modelo de anúncio: apenas o essencial para publicar.
// Sem Renavam, chassi, placa ou campos documentais — o foco é o anúncio.
export type VehicleStatus = "disponivel" | "indisponivel" | "vendido";

export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  mileage: number;
  images: string[];
  status: VehicleStatus;
};

export const STATUS_LABEL: Record<VehicleStatus, string> = {
  disponivel: "Disponível",
  indisponivel: "Indisponível",
  vendido: "Vendido",
};

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

// Dados de demonstração até a integração com o Supabase.
export const featuredVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Porsche Panamera",
    brand: "Porsche",
    model: "Panamera",
    version: "4 E-Hybrid Platinum Edition",
    year: 2022,
    price: 689900,
    mileage: 18400,
    images: [photo("1503376780353-7e6692767b70")],
    status: "disponivel",
  },
  {
    id: "2",
    name: "BMW M4",
    brand: "BMW",
    model: "M4",
    version: "Competition 3.0 Biturbo",
    year: 2021,
    price: 619900,
    mileage: 22100,
    images: [photo("1580273916550-e323be2ae537")],
    status: "disponivel",
  },
  {
    id: "3",
    name: "Mercedes-AMG GT R",
    brand: "Mercedes-Benz",
    model: "AMG GT",
    version: "R 4.0 V8",
    year: 2019,
    price: 1089000,
    mileage: 9800,
    images: [photo("1553440569-bcc63803a83d")],
    status: "indisponivel",
  },
  {
    id: "4",
    name: "Ford Mustang",
    brand: "Ford",
    model: "Mustang",
    version: "GT Premium 5.0 V8",
    year: 2020,
    price: 389900,
    mileage: 31500,
    images: [photo("1494976388531-d1058494cdd8")],
    status: "disponivel",
  },
  {
    id: "5",
    name: "Audi RS6 Avant",
    brand: "Audi",
    model: "RS6",
    version: "Avant Performance 4.0 TFSI",
    year: 2020,
    price: 749900,
    mileage: 27300,
    images: [photo("1606664515524-ed2f786a0bd6")],
    status: "vendido",
  },
  {
    id: "6",
    name: "Hyundai HB20S",
    brand: "Hyundai",
    model: "HB20S",
    version: "Platinum Plus 1.0 TGDI",
    year: 2023,
    price: 109900,
    mileage: 12600,
    images: [photo("1619767886558-efdc259cde1a")],
    status: "disponivel",
  },
];

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const km = new Intl.NumberFormat("pt-BR");

export const formatPrice = (value: number) => brl.format(value);
export const formatMileage = (value: number) => `${km.format(value)} km`;
