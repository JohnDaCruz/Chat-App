import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware"

export async function middleware(request:NextRequest) {
    const token = await request.cookies.get('next-auth.session-token')?.value;

    console.log("--MIDDLEWARE--");
    console.log("--TOKEN-->", token);

    if (token) {
        console.log("--WITH TOKEN--");
        return new NextResponse(JSON.stringify({ message: "Usuário já autenticado, não é possível se regitrar" }));
    }
    console.log("--WITHout TOKEN--");
    return NextResponse.next();
}

export const config = {
    matcher: "/api/register_Controller/:path*",
};
