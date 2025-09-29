import { LATEX_DIAGONALLY_DOMINANT, LATEX_GAUSS_SEIDEL_MATRICIAL, LATEX_GS_DESARROLLO } from "@/const/const";
import Latex from "react-latex-next";

export default function TeoriaScreen() {

    console.log('render teoria');
    const LATEX_GAUSS_SEIDEL = String.raw`\LARGE
    x_i^{(k)} = \frac{1}{a_{ii}} \left[
    b_i - \sum_{j=1}^{i-1} a_{ij} x_j^{(k)} - \sum_{j=i+1}^{n} a_{ij} x_j^{(k-1)}
    \right] \qquad \forall i = 1:n \quad \forall k = 1:n
    `;

    return (
        <div className="text-foreground pb-10 bg-background mt-10">
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

            <h1 className="text-center text-lg font-medium mt-4 mb-2">Iteración de Gauss-Seidel.</h1>
            <div className="flex items-center justify-center h-32">
                <Latex >{`$${LATEX_GAUSS_SEIDEL}$`}</Latex>
            </div>

        </div>
    )
}
