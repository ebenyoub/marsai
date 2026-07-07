import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FestivalInstancesTab, FestivalInstancesTabProps } from "./FestivalInstanceTab";
import { CreateFestivalTab } from "./CreateFestivalTab";

export function CMSMainTabs(props: FestivalInstancesTabProps) {
  
  return (
    <Tabs defaultValue="instances" className="w-full">
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger value="instances">Festivals</TabsTrigger>
        <TabsTrigger value="create">Créer</TabsTrigger>
      </TabsList>

      <TabsContent value="instances">
        <FestivalInstancesTab {...props} />
      </TabsContent>

      <TabsContent value="create">
        <CreateFestivalTab {...props} />
      </TabsContent>
    </Tabs>
  );
}