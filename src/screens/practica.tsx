import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Latex from "react-latex-next";

export default function PracticaScreen() {
    const [matrix, setMatrix] = useState<number[][]>([
        [0, 0],
        [0, 0],
    ]);

    const addRow = () => setMatrix((prev) => [...prev, Array(prev[0].length).fill(0)]);
    const addCol = () => setMatrix((prev) => prev.map((row) => [...row, 0]));
    const removeRow = () => setMatrix((prev) => prev.slice(0, -1));
    const removeCol = () => setMatrix((prev) => prev.map((row) => row.slice(0, -1)));

    const handleChange = (i: number, j: number, value: string) => {
        const newMatrix = matrix.map((row, ri) =>
            row.map((col, ci) => (ri === i && ci === j ? Number(value) : col))
        );
        setMatrix(newMatrix);
    };

    // Generar LaTeX de la matriz
    const matrixLatex = `\\begin{pmatrix}
        ${matrix.map((row) => row.join(" & ")).join(" \\\\ ")}
      \\end{pmatrix}`;

    return (
        <div>
            <h1 className="text-center text-3xl font-medium">Práctica</h1>
            <p>Comentario idea: simular si una matriz ingresada es diagonalmente dominante</p>
            <p>despues simulador del metodo con ejemplos prearmados, que se vea cantidad de iteraciones, criterio de paro</p>
            <p>compararlo con otro metodo</p>

            <Card className="w-full max-w-xl mx-auto mt-6">
                <CardHeader>
                    <CardTitle>Editor de Matriz</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex gap-2 flex-wrap">
                        <Button onClick={addRow}>Agregar fila</Button>
                        <Button onClick={addCol}>Agregar columna</Button>
                        <Button variant="destructive" onClick={removeRow}>Quitar fila</Button>
                        <Button variant="destructive" onClick={removeCol}>Quitar columna</Button>
                    </div>

                    <table className="border-collapse mx-auto">
                        <tbody>
                            {matrix.map((row, i) => (
                                <tr key={i}>
                                    {row.map((value, j) => (
                                        <td key={j} className="p-1 border">
                                            <input
                                                type="number"
                                                value={value}
                                                onClick={(e: any) => e.target.select()}
                                                onChange={(e) => handleChange(i, j, e.target.value)}
                                                className="w-16 text-center border rounded"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-center mt-4 text-xl">
                        <Latex>{`$${matrixLatex}$`}</Latex>
                    </div>


                </CardContent>
            </Card>
        </div>
    )
}
