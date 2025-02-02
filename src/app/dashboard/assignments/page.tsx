"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IAssignment } from "@/model/assignment";
import { Eye, Timer, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Partial<IAssignment>[]>([]);
  useEffect(() => {
    setAssignments([]);
  }, []);
  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <Card key={String(assignment._id)}>
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
              <CardDescription>{assignment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Timer className="mr-1 h-4 w-4" />
                    Due {assignment?.dueDate?.toLocaleString()}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {assignment.submissions?.length} summited
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/dashboard/assignments/${assignment._id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
