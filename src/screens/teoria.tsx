import { LATEX_DIAGONALLY_DOMINANT, LATEX_GAUSS_SEIDEL } from "@/const/const";
import Latex from "react-latex-next";

export default function TeoriaScreen() {

    console.log('render teoria');


    return (
        <div className="text-foreground pb-10 bg-background mt-10">
            <p>Comentario idea: aca podria ir introduccion, precondiciones, de que tipo es este metodo</p>
            <p>desarrollo teorico blblalba</p>
            <h1 className="text-center text-lg font-medium text-foreground">Condición diagonalmente dominante</h1>
            <div className="flex items-center justify-center h-32">
                <Latex >{`$${LATEX_DIAGONALLY_DOMINANT}$`}</Latex>
            </div>
            <h1 className="text-center text-lg font-medium mt-4 mb-2">Iteración de Gauss-Seidel.</h1>
            <div className="flex items-center justify-center h-32">
                <Latex >{`$${LATEX_GAUSS_SEIDEL}$`}</Latex>
            </div>


        </div>
    )
}
