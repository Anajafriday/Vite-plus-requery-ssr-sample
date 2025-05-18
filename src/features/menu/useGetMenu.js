import { useQuery } from "@tanstack/react-query"
import { getMenu } from "../../lib/apiMenu"
import { useParams } from "react-router"

export function useGetMenu() {
    const { id } = useParams()
    const { isLoading, data: { recipe } = {} } = useQuery({
        queryKey: ["menu", id],
        queryFn: async () => await getMenu(id)
    })
    return { isLoading, recipe }
}

