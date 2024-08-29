import {
    CalendarPlus,
    Check,
    CircleDollarSign,
    CreditCard,
    House,
    HousePlus,
    Icon,
    IdCard,
    ShieldAlert,
  } from "lucide-react";

export const icons = [
    {
      name: `House`,
      Icon: House,
    },
    {
      name: `HousPlus`,
      Icon: HousePlus,
    },
    {
      name: `IdCard`,
      Icon: IdCard,
    },
    {
      name: `ShieldAlert`,
      Icon: ShieldAlert,
    },
    {
      name: `CircleDollarSign`,
      Icon: CircleDollarSign,
    },
    {
      name: `CalendarPlus`,
      Icon: CalendarPlus,
    },
    {
      name: `CreditCard`,
      Icon: CreditCard,
    },
  ];


export const getYourIcon = (iconName) => {
    return icons.filter(obj => obj.name == iconName)[0].Icon;
}