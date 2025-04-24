export interface Role {
  id: number;
  naim: string;
  accounts?: Account[];
}

export interface Account {
  id: number;
  login: string;
  password: string;
  role_id: number;
  token: string;
  role?: Role;
  volonter?: Volonter;
  partner?: Partner;
}

export interface Partner {
  id: number;
  naim: string;
  id_acc: number;
  account?: Account;
  bonuses?: NachBonus[];
}

export interface Category {
  id: number;
  naim: string;
  bonuses?: Bonus[];
}

export interface Bonus {
  id: number;
  id_partner: number;
  naim: string;
  count: number;
  id_category?: number | null;
  partner?: Partner;
  category?: Category | null;
  nachBonuses?: NachBonus[];
}

export interface Volonter {
  id: number;
  fio?: string | null;
  inn?: string | null;
  tel?: string | null;
  DOB?: string | null;
  id_acc: number;
  dost?: string | null;
  account?: Account;
  nachBonuses?: NachBonus[];
}

export interface NachBonus {
  id: number;
  id_bonus?: number | null;
  time_received?: string | null;
  id_volonter?: number | null;
  is_expired?: boolean;
  bonus?: Bonus | null;
  bonus_name: string | null;
  volonter?: Volonter | null;
}
