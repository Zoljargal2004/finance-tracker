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

   const lis = icons.filter(obj => obj.name == iconName);
  console.log(lis)
  if (!lis.length){
    return icons[0].Icon
  }
  return lis[0].Icon
}