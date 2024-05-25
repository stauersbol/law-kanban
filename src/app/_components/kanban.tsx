import { api } from "~/trpc/server"
import { KanbanItem } from "./kanban-item";
import { KanbanCategory } from "./kanban-category";

export const Kanban = async () => {

    const laws = await api.law.fetchAll();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
    const statuses: string[] = [...new Set(laws.map((law) => law.status))] // we know that the status is a string and there is nothing unsafe here.

    return (
        <div className="flex h-screen mt-5 space-x-5 mb-5 justify-center items-start">
            {statuses.map(status => (
                <KanbanCategory key={status} status={status}>
                    {laws.filter(law => law.status === status).map(law => (
                        <KanbanItem key={law.id} lawNumber={law.number} lawTitle={law.title} />
                    ))}
                </KanbanCategory>
            ))}
        </div>
    )
}
