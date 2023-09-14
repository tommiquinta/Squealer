import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {

    const res = req.next()
    const supabase = createMiddlewareClient({ req, res })
    await supabase.auth.getSession()

    return res
}