"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export const CreateLaws = () => {
    const router = useRouter();

    const createPost = api.law.create.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });

    return (
        <button className="text-white justify-center items-center rounded-xl hover:bg-gray-800 transition-all hover:text-gray-300 hover:border-gray-300 font-medium flex border-gray-500 border-2 p-2 h-10" onClick={() => createPost.mutate()}>
            {createPost.isPending ? "Creating..." : "Fetch all laws"}
        </button>
    );
}

