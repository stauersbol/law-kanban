import { CreateLaws } from './create-laws'

export const TopBar = () => {
    return (
        <nav className="flex justify-end p-3 items-center bg-gray-700 border-b-gray-600 h-16">
            <CreateLaws/>
        </nav>
    )
}

