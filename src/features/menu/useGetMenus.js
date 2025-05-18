import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { getMenus } from "../../lib/apiMenu"

export function useGetMenus() {
    const query = useQuery({
        queryKey: ["menus"],
        queryFn: async () => await getMenus()
    })
    return query
}

