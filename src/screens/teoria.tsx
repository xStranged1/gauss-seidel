import { LATEX_DIAGONALLY_DOMINANT, LATEX_GAUSS_SEIDEL_MATRICIAL, LATEX_GS_DESARROLLO } from "@/const/const";
import Latex from "react-latex-next";
import GaussSeidel from "@/components/TeoriaComponent";

export default function TeoriaScreen() {

    console.log('render teoria');

    return (
        <div className="text-foreground pb-10 bg-background mt-10">
            <GaussSeidel />
            <h1 className="text-center text-lg font-medium text-foreground">Condición diagonalmente dominante</h1>
            <div className="flex items-center justify-center h-32">
                <Latex >{`$${LATEX_DIAGONALLY_DOMINANT}$`}</Latex>
            </div>


            <div className="flex items-center justify-center">
                <Latex >{`$${LATEX_GAUSS_SEIDEL_MATRICIAL}$`}</Latex>
            </div>

            <div className="flex items-center justify-center">
                <div>
                    <Latex>{"$$\\big[(D - E) - F \\big]\\vec{x} = \\vec{b}$$"}</Latex>
                    <br />
                    <Latex>{"$$ (D - E)\\vec{x} - F\\vec{x} = \\vec{b} $$"}</Latex>
                    <br />
                    <Latex>{"$$ (D - E)\\vec{x} = F\\vec{x} + \\vec{b} $$"}</Latex>
                    <br />
                    <Latex>{"\\text{Premultiplicando por } (D - E)^{-1}:"}</Latex>
                    <Latex>{"$$ (D - E)^{-1}(D - E)\\vec{x} = (D - E)^{-1}F\\vec{x} + (D - E)^{-1}\\vec{b} \\qquad (4) $$"}</Latex>
                    <br />
                    <Latex>{"\\text{Despejando } F \\text{ de (2):}"}</Latex>
                    <Latex>{"$$ F = (D - E) - A \\qquad (5) $$"}</Latex>
                    <br />
                    <Latex>{"\\text{Reemplazando (5) en (4):}"}</Latex>
                    <Latex>{"$$ \\vec{x} = (D - E)^{-1}\\Big[(D - E) - A\\Big]\\vec{x} + (D - E)^{-1}\\vec{b} $$"}</Latex>
                </div>
            </div>


            <div className="flex items-center justify-center h-32">
                <Latex >{`$${LATEX_GS_DESARROLLO}$`}</Latex>
            </div>



        </div>
    )
}
