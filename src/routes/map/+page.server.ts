import { getMarkersForMap } from "$lib/images/server/db";
import type { PageServerLoad } from "../$types"

export const load: PageServerLoad = async () => {
    const markers = getMarkersForMap(1);
    return {
        markers,
    };
};