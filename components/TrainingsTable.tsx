"use client"

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";

export type Training = {
  ID: number;
  title: string;
  description: string;
  date: string;
  duration: number;
  instructor: string;
  category_id: number;
};

export type Category = {
  id: number;
  name: string;
};

import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  createTraining,
  deleteTraining,
  updateTraining,
} from "@/app/actions/training";
import { enroll } from "@/app/actions/enroll";
import { FormState } from "@/app/lib/definitions";

function EnrollTrainingAction({
  email,
  role,
  training,
  categories,
  children,
}: {
  email: string | unknown;
  role: number | unknown;
  training: Training;
  categories: Category[];
  children: React.ReactNode;
}) {
  type Action = (state: FormState, formData: FormData) => Promise<FormState>;
  const isAdmin = role === 5150;
  const [state, action, pending] = useActionState(
    (isAdmin ? updateTraining : enroll) as Action,
    undefined
  );

  const [trainingTitle, setTrainingTitle] = React.useState(training.title);
  const [trainingDescription, setTrainingDescription] = React.useState(
    training.description
  );
  const [trainingDate, setTrainingDate] = React.useState(
    training.date ? new Date(training.date).toISOString().split("T")[0] : ""
  );
  const [trainingDuration, setTrainingDuration] = React.useState(
    training.duration
  );
  const [trainingInstructor, setTrainingInstructor] = React.useState(
    training.instructor
  );
  const [trainingCategoryId, setTrainingCategoryId] = React.useState(
    training.category_id
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        {pending ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-end gap-2 mt-4">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isAdmin
                  ? `Edit Training ${training.ID}`
                  : `Are you sure to enroll ${training.title}?`}
              </AlertDialogTitle>
              <form
                id="update-training-form"
                action={action}
                className="flex flex-col gap-2"
              >
                <input type="hidden" name="id" value={training.ID} />
                {isAdmin ? (
                  <>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={trainingTitle}
                        onChange={(e) => setTrainingTitle(e.target.value)}
                        placeholder="Training title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={trainingDescription}
                        onChange={(e) => setTrainingDescription(e.target.value)}
                        placeholder="Training description"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={trainingDate}
                        onChange={(e) => setTrainingDate(e.target.value)}
                        placeholder="Training date"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        name="duration"
                        type="number"
                        value={trainingDuration}
                        onChange={(e) =>
                          setTrainingDuration(parseInt(e.target.value))
                        }
                        placeholder="Training duration"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instructor">Instructor</Label>
                      <Input
                        id="instructor"
                        name="instructor"
                        value={trainingInstructor}
                        onChange={(e) => setTrainingInstructor(e.target.value)}
                        placeholder="Training instructor"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <input
                        type="hidden"
                        name="category_id"
                        value={trainingCategoryId}
                      />
                      <Select
                        value={String(trainingCategoryId)}
                        onValueChange={(value) =>
                          setTrainingCategoryId(parseInt(value))
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={String(category.id)}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <div>
                    <input type="hidden" name="email" value={String(email)} />
                    <input
                      type="hidden"
                      name="training_id"
                      value={training.ID}
                    />
                    <p>
                      You will be enrolled to this training once you click
                      "Continue".
                    </p>
                  </div>
                )}
              </form>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                form="update-training-form"
                disabled={pending}
              >
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isAdmin ? "Save Changes" : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CreateTrainingAction({
  categories,
  children,
}: {
  categories: Category[];
  children: React.ReactNode;
}) {
  const [state, action, pending] = useActionState(createTraining, undefined);

  const [trainingTitle, setTrainingTitle] = React.useState("");
  const [trainingDescription, setTrainingDescription] = React.useState("");
  const [trainingDate, setTrainingDate] = React.useState("");
  const [trainingDuration, setTrainingDuration] = React.useState(0);
  const [trainingInstructor, setTrainingInstructor] = React.useState("");
  const [trainingCategoryId, setTrainingCategoryId] = React.useState<
    number | undefined
  >(undefined);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Training</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to create a new training.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          id="create-training-form"
          action={action}
          className="flex flex-col gap-2"
        >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={trainingTitle}
              onChange={(e) => setTrainingTitle(e.target.value)}
              placeholder="Training title"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={trainingDescription}
              onChange={(e) => setTrainingDescription(e.target.value)}
              placeholder="Training description"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={trainingDate}
              onChange={(e) => setTrainingDate(e.target.value)}
              placeholder="Training date"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration (in days)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              value={trainingDuration}
              onChange={(e) => setTrainingDuration(parseInt(e.target.value))}
              placeholder="Training duration"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="instructor">Instructor</Label>
            <Input
              id="instructor"
              name="instructor"
              value={trainingInstructor}
              onChange={(e) => setTrainingInstructor(e.target.value)}
              placeholder="Training instructor"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <input
              type="hidden"
              name="category_id"
              value={trainingCategoryId ?? ""}
            />
            <Select
              onValueChange={(value) => setTrainingCategoryId(parseInt(value))}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            form="create-training-form"
            disabled={pending}
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteTrainingAction({
  training,
  children,
}: {
  training: Training;
  children: React.ReactNode;
}) {
  const [state, action, pending] = useActionState(deleteTraining, undefined);

  React.useEffect(() => {
    if (state?.message && state.message !== "success") {
      console.error(state.message);
    }
    if (state?.message === "success") {
      window.location.reload();
    }
  }, [state]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the "
            <strong>{training.title}</strong>" training.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form id="delete-training-form" action={action}>
          <input type="hidden" name="id" value={training.ID} />
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            form="delete-training-form"
            disabled={pending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {pending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function TrainingsTable({
  email: userEmail,
  role: userRole,
}: {
  email: string | unknown;
  role: number | unknown;
}) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [data, setData] = React.useState<Training[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // The email prop is now directly available as userEmail
  const columns = React.useMemo<ColumnDef<Training>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("title")}</div>
        ),
      },
      {
        accessorKey: "instructor",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Instructor
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("instructor")}</div>,
      },
      {
        accessorKey: "date",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <div className="text-right">Date</div>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const date = new Date(row.getValue("date"));
          const formatted = new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(date);

          return <div>{formatted}</div>;
        },
      },
      {
        accessorKey: "duration",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <div className="text-right">Duration</div>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("duration")} days</div>,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const training = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(training.ID.toString())
                  }
                >
                  Copy Training ID
                </DropdownMenuItem>
                <EnrollTrainingAction
                  email={userEmail}
                  role={userRole}
                  categories={categories}
                  training={training}
                >
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {userRole === 5150 ? "Edit Training" : "Enroll Training"}
                  </DropdownMenuItem>
                </EnrollTrainingAction>
                {userRole === 5150 && (
                  <DeleteTrainingAction training={training}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Delete Training
                    </DropdownMenuItem>
                  </DeleteTrainingAction>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>View details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [userEmail, userRole, categories]
  );

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [trainingsResponse, categoriesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URI}/trainings`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URI}/categories`, {
            credentials: "include",
          }),
        ]);

        if (!trainingsResponse.ok) {
          throw new Error("Failed to fetch trainings.");
        }
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories.");
        }

        const trainings = await trainingsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setData(trainings);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
        // TODO: Handle error state in UI
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      <Skeleton className="h-6 w-full" />
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {table.getAllColumns().map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1">
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* right */}
        <div className="flex gap-2">
          {userRole === 5150 && (
            <CreateTrainingAction categories={categories}>
              <Button>Create Training</Button>
            </CreateTrainingAction>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
