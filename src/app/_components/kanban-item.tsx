export const KanbanItem = (law: { lawNumber: string, lawTitle: string }) => {
    return (
        <div className="bg-slate-600 rounded-xl hyphens-auto p-5">
            <p className="bg-red-800 inline-block px-3 mb-3 rounded-xl text-white">{law.lawNumber}</p>
            <p className="text-white" lang="da">{law.lawTitle}</p>
        </div>
    )
}
