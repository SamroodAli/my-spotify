import { NextResponse, NextMiddleware } from "next/server";
const protectedPages = ["/", "/playlist", "/library"];

const middleWare: NextMiddleware = (req) => {
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
};

export default middleWare;
