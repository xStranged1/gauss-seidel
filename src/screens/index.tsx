import { basename } from "@/const/const";
import { Link } from "wouter";

export default function IndexScreen() {

    return (
        <div>
            <h1>Inicio</h1>
            <Link href={`${basename}/teoria`}>Teoría</Link>
            <Link href={`${basename}/practica`}>Práctica</Link>
        </div>
    )
}
