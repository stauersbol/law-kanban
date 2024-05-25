import { api } from "~/trpc/server"

export const Kanban = async () => {

    const laws = await api.law.fetchAll();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
    const statuses: string[] = [...new Set(laws.map((law) => law.status))] // we know that the status is a string and there is nothing unsafe here.

    return (
        <div className="flex h-screen mt-5 space-x-5 mb-5 justify-center items-start">
            {statuses.map(status => (
                <div className="flex w-72 h-full flex-col rounded-xl" key={status}>
                    <h2 className="font-bold text-white text-xl">{status}</h2>
                    <div className="overflow-y-auto space-y-5 overflow-x-hidden" style={{ scrollbarWidth: 'thin' }}>
                        {laws.filter(law => law.status === status).map(law => (
                            <div className="bg-slate-600 rounded-xl hyphens-auto p-5" key={law.id}>
                                <p className="bg-red-800 inline-block px-3 mb-3 rounded-xl text-white">{law.number}</p>
                                <p className="text-white" lang="da" key={law.id}>{law.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
