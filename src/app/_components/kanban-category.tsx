export const KanbanCategory = ({ status, children }: { status: string, children: React.ReactNode }) => {
    return (
        <div className="flex w-72 h-full flex-col rounded-xl">
            <h2 className="font-bold text-white text-xl">{status}</h2>
            <div className="overflow-y-auto space-y-5 overflow-x-hidden" style={{ scrollbarWidth: 'thin' }}>
                {children}
            </div>
        </div>
    )
}
