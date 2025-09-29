import { LATEX_DIAGONALLY_DOMINANT } from "@/const/const";
import Latex from "react-latex-next";
import GaussSeidel from "@/components/TeoriaComponent";
import DiagonalDominanteCard from "@/components/DiagDominante";
import DesarrolloMatricial from "@/components/DesarrolloMatricial";

export default function TeoriaScreen() {

    console.log('render teoria');

    return (
        <div className="text-foreground pb-10 bg-background mt-10">
            <GaussSeidel />
            <h1 className="text-center text-lg font-medium text-foreground">Condición diagonalmente dominante</h1>
            <div className="flex items-center justify-center h-32">
                <Latex >{`$${LATEX_DIAGONALLY_DOMINANT}$`}</Latex>
            </div>
            <DiagonalDominanteCard />

            <div className="mt-20" />
            <DesarrolloMatricial />
        </div>
    )
}
