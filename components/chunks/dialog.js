"use client";

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
import { getYourIcon, icons } from "../../app/data/icons";
import { Check } from "lucide-react";
import colors from "../../app/data/colors";

import { act, useEffect, useState } from "react";
import { editCategory, postNewCat } from "../../app/services/category";

export default function AddNewCatForum(props) {
  const { icon, color, name, id } = props.initData;

  const [ActiveIcon, setActiveIcon] = useState(icons[0].Icon);
  const [activeColor, setActiveColor] = useState(`#0166FF`);
  const [newCatValue, setNewCatVal] = useState("");
  const [changed, setChanged] = useState(false);

  if (icon && !changed) {
    setActiveIcon(getYourIcon(icon));
    setActiveColor(color);
    setNewCatVal(name);
    setChanged(true);
  }

  const reset = () => {
    setActiveColor("#0166FF");
    setActiveIcon(icons[0].Icon);
    setNewCatVal("");
    setChanged(false);
  };

  const inputHandler = (event) => {
    const { value } = event.target;
    setNewCatVal(value);
  };

  const IconsPopOver = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <div type="button" variant="secondary">
            <ActiveIcon style={{ color: activeColor }} />
          </div>
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
                key={code}
                className="w-6 h-6 rounded-full text-white flex justify-center items-center  "
                style={{ backgroundColor: code }}
                onClick={() => {
                  setChanged(true);
                  setActiveColor(code);
                }}
              >
                {code == activeColor && <Check size={20} />}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <Dialog open={props.open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {props.type == 0 ? "Add Category" : "Edit Category"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <IconsPopOver />

          <Input onChange={inputHandler} value={newCatValue} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex gap-3">
              {props.type == 0 ? (
                <Button
                  type="button"
                  className="flex-1 rounded-[99999px] bg-[green]"
                  onClick={async () => {
                    await postNewCat(
                      newCatValue,
                      icons.filter((obj) => obj.Icon == ActiveIcon)[0].name,
                      activeColor
                    );
                    props.reset();
                    reset();
                  }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  className="flex-1 rounded-[99999px] bg-[green]"
                  onClick={async () => {
                    props.reset();
                    await editCategory(
                      id,
                      newCatValue,
                      icons.filter((obj) => obj.Icon == ActiveIcon)[0].name,
                      activeColor
                    );
                    reset();
                  }}
                >
                  Update
                </Button>
              )}
              <Button
                type="button"
                className="flex-1 rounded-[99999px] bg-[green]"
                onClick={() => {
                  reset();
                  props.reset();
                  props.controlParent();
                }}
              >
                Close
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
