import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req) {
    const requestURL = new URL(req.url);

    const code = requestURL.searchParams.get('code');

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })
        await supabase.auth.exchangeCodeForSession(code)
    }

    console.log(requestURL.origin);

    return NextResponse.redirect(new URL(requestURL.origin+"/moderators"));
}