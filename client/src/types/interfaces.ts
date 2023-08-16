import { CARDID_TYPE, SESSION, COMPUTER_STATE } from '../constants/emuns'

export interface Student {
  id:                 number;
  name:               string | null;
  cardIdType:         keyof typeof CARDID_TYPE | null;
  cardIdNumber:       string | null;
  session:            keyof typeof SESSION | null;
  computerStock:  Partial<ComputerStock> | null;
}

export interface Computer {
  id:              number;
  name:            string | null;
  brand:           string | null;
  processor:       string | null;
  ram:             string | null;
  hasGraphicsCard: boolean;
}

export interface ComputerStock {
  id:       number;
  code:     string | null;
  location: string | null;
  state:    keyof typeof COMPUTER_STATE | null;
  computer: Partial<Computer> | null;
}