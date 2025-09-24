import Latex from "react-latex-next";

export default function TeoriaScreen() {

    console.log('render teoria');

    const formula = String.raw`\LARGE
        x_i^{(k)} = \frac{1}{a_{ii}} \left[
        b_i - \sum_{j=1}^{i-1} a_{ij} x_j^{(k)} - \sum_{j=i+1}^{n} a_{ij} x_j^{(k-1)}
        \right] \qquad \forall i = 1:n \quad \forall k = 1:n
    `;
    return (
        <div>
            <h1 className="text-center text-2xl font-medium">Teoría</h1>
            <p>Comentario idea: aca podria ir introduccion, precondiciones, de que tipo es este metodo</p>
            <p>condicion suf pero no necesaria que sea diagonalmente dominante, que es diagonalmente dominante</p>
            <p>desarrollo teorico blblalba</p>
            <p>desarrollo teorico blblalba</p>
            <h1 className="text-center text-lg font-medium mt-4 mb-2">Iteración de Gauss-Seidel.</h1>
            <div className="flex items-center justify-center">
                <Latex >{`$${formula}$`}</Latex>
            </div>
        </div>
    )
}
