import { basename } from "@/const/const";
import { Link, useLocation } from "wouter";

export function Navbar() {

    const [location] = useLocation();
    console.log('basename');
    console.log(basename);
    console.log("location");
    console.log(location);

    const isAtTeoria = location === `${basename}/teoria` || location === `${basename}/teoria/`;
    const isAtPractica = location === `${basename}/practica` || location === `${basename}/practica/`;

    return (
        <div className="mt-12">
            <div className="mt-5" />
            <div>
                <div className="flex flex-row justify-center">
                    <h1 className="text-3xl font-semibold">Gauss-Seidel</h1>
                </div>
                <div className="flex flex-row justify-center">
                    <h2 className="font-medium">Método iterativo utilizado para resolver sistemas de ecuaciones lineales.</h2>
                </div>
            </div>
            <div className="h-10 mt-6 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-10 grid w-full grid-cols-2">
                <Link
                    className={`${isAtTeoria ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                    href={`/gauss-seidel/teoria`}
                >
                    <h3>Teoría</h3>
                </Link>
                <Link
                    href={`${basename}/practica`}
                    className={`${isAtPractica ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                >
                    <h3 className="bold">Práctica</h3>
                </Link>
            </div>
        </div>
    );
}
