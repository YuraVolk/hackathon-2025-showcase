export interface IBonus {
  id: string;
  organization_name: string;
  name: string;
  description: string;
}

export interface IBonusHistoryItem {
  id: number;
  volunteer_id: number;
  bonus: IBonus;
  created_at: string;
  is_used: boolean;
}

export interface IVolunteer {
  id: number;
  fio: string;
  inn: string;
  phone_number: string;
  email: string;
  birth_date: string;
  achievements: string;
  unique_code: string;
  history: IBonusHistoryItem[];
}

export interface IOrganization {
  id: string;
  name: string;
  description: string;
  bonuses: IBonusHistoryItem[];
}
