import { sql } from "@/db/dbConfiguration";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AddMemberForm } from "@/feature/member/addMember/form/AddMemberForm";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function Home() {
  const users = await sql`SELECT id_user, nama FROM tbl_user`;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Team Members</h1>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {users.map((user) => (
          <Card
            key={user.id_user}
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(user.nama)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{user.nama}</h3>
                <p className="text-sm text-muted-foreground">
                  ID: {user.id_user}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-sm">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Team Member
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form Section */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-6">Add New Member</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full lg:col-span-2">
            <AddMemberForm />
          </div>
        </div>
      </div>
    </div>
  );
}
