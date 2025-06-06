import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Heart } from "lucide-react";
import FavoristList from "./FavoritesList/FavoristList";
import { api } from "../../../../api/api";

export default async function DrawerFav() {

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          size={"lg"}
          className="!bg-transparent !border-0 hover:!bg-transparent !shadow-none"
        >
          <Heart aria-hidden="true" className="scale-130" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tus favoritos ❤</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4">
          <FavoristList  />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
