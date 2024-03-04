import { getMaps } from '$lib/images/server/db'
import type { PageServerLoad } from './$types'

// We have imported the `PageLoad` type from the relative `./$types` folder that
// is hidden in the generated `.svelte-kit` folder. Those generated types
// contain a `PageLoad` type with a `params` and `data` object that matches our route.
// You need to run the dev server or `svelte-kit sync` to generate them.
export const load: PageServerLoad= async () => {
    const maps = getMaps();
    return {
        maps,
    }
}