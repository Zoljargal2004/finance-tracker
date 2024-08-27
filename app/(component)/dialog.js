import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { act, useState } from "react";

export default function AddNewCatForum(props) {
  const [openish, setOpen] = useState(props.open)
  return (
    <Dialog open={openish}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <IconsPopOver />

          <Input />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full rounded-[99999px] bg-[green]"
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const IconsPopOver = () => {
  const [ActiveIcon, setActiveIcon] = useState(House);
  const [activeColor, setActiveColor] = useState("#0166FF");

  return (
    <Popover>
      <PopoverTrigger>
        <Button type="button" variant="secondary">
          <ActiveIcon style={{ color: activeColor }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-6 gap-1">
          {icons.map(({ name, Icon }) => (
            <div
              key={name}
              onClick={() => {
                setActiveIcon(Icon);
              }}
              className="cursor-pointer"
            >
              <Icon />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {colors.map(({ name, code }) => (
            <div
              className="w-6 h-6 rounded-full text-white flex justify-center items-center  "
              style={{ backgroundColor: code }}
              onClick={()=>{setActiveColor(code)}}
            >
              {code == activeColor && <Check size={20} />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const icons = [
  {
    name: `house`,
    Icon: House,
  },
  {
    name: `house-plus`,
    Icon: HousePlus,
  },
  {
    name: `id-card`,
    Icon: IdCard,
  },
  {
    name: `shield-alert`,
    Icon: ShieldAlert,
  },
  {
    name: `circle-dollar-sign`,
    Icon: CircleDollarSign,
  },
  {
    name: `calendar-plus`,
    Icon: CalendarPlus,
  },
  {
    name: `credit-card`,
    Icon: CreditCard,
  },
];

const colors = [
  {
    name: "heavyBlue",
    code: "#0166FF",
  },
  {
    name: "navyBlue",
    code: "#01B3FF",
  },
  {
    name: "green",
    code: "#41CC00",
  },
  {
    name: "yellow",
    code: "#F9D100",
  },
  {
    name: "orange",
    code: "#FF7B01",
  },
  {
    name: "purple",
    code: "#AE01FF",
  },
  {
    name: "red",
    code: "#FF0101",
  },
];
