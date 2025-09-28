import { basename } from "@/const/const";
import { Link, useLocation } from "wouter";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
    const [location] = useLocation();
    const isAtTeoria = location === `${basename}/teoria` || location === `${basename}/teoria/`;
    const isAtPractica = location === `${basename}/practica` || location === `${basename}/practica/`;

    const baseLinkClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    return (
        <div className="pt-12 text-foreground bg-background">
            <div>
                <div className="flex flex-row justify-center relative">
                    <h1 className="text-3xl font-semibold">Gauss-Seidel</h1>
                    <div className="absolute top-0 right-12">
                        <ModeToggle />
                    </div>

                </div>
                <div className="flex flex-row justify-center">
                    <h2 className="font-medium">
                        Método iterativo para resolver sistemas de ecuaciones lineales.
                    </h2>
                </div>
            </div>

            <div className="h-10 mt-6 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2">
                <Link
                    href={`${basename}/teoria`}
                    className={`${baseLinkClasses} ${isAtTeoria ? "bg-background text-foreground" : ""}`}
                >
                    <h3>Teoría</h3>
                </Link>
                <Link
                    href={`${basename}/practica`}
                    className={`${baseLinkClasses} ${isAtPractica ? "bg-background text-foreground" : ""}`}
                >
                    <h3>Práctica</h3>
                </Link>
            </div>
        </div>
    );
}
