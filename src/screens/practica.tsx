import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Latex from "react-latex-next";
import {
    gaussSeidel,
    isDiagonallyDominant,
    multiplyMatrices,
    inverseMatrix,
    addMatrices,
    subtractMatrices,
    lowerTriangularZeroDiagonal,
    premultiply
} from "@/utils/matrix";
import { MATRIX_4x1, MATRIX_4x4 } from "@/const/const";

export default function PracticaScreen() {
    const [matrix, setMatrix] = useState<string[][]>(MATRIX_4x4);

    const [rhs, setRhs] = useState<string[]>(MATRIX_4x1);
    const [result, setResult] = useState<{ solution: number[], steps: number[][] } | null>(null);

    const addVariable = () => {
        setMatrix((prev) => {
            const size = prev.length + 1;
            const newMatrix = prev.map((row) => [...row, "0"]);
            newMatrix.push(Array(size).fill("0"));
            return newMatrix;
        });
        setRhs((prev) => [...prev, "0"]);
    };

    const removeVariable = () => {
        if (matrix.length > 1) {
            setMatrix((prev) => prev.slice(0, -1).map((row) => row.slice(0, -1)));
            setRhs((prev) => prev.slice(0, -1));
        }
    };

    const handleChange = (i: number, j: number, value: string) => {
        const newMatrix = matrix.map((row, ri) =>
            row.map((col, ci) => (ri === i && ci === j ? value : col))
        );
        setMatrix(newMatrix);
    };

    const handleChangeRhs = (i: number, value: string) => {
        const newRhs = rhs.map((v, ri) => (ri === i ? value : v));
        setRhs(newRhs);
    };

    const systemLatex = matrix
        .map((row, i) => {
            let lhs = row
                .map((coefStr, j) => {
                    const coef = Number(coefStr);
                    if (isNaN(coef) || coef === 0) return null;
                    const variable = `x_{${j + 1}}`;
                    if (coef === 1) return `+ ${variable}`;
                    if (coef === -1) return `- ${variable}`;
                    if (coef > 0) return `+ ${coef}${variable}`;
                    return `${coef}${variable}`;
                })
                .filter(Boolean)
                .join(" ");
            lhs = lhs.replace(/^\+\s*/, "");
            return `${lhs || "0"} = ${rhs[i]}`;
        })
        .join(" \\\\ ");

    const handleSolve = () => {
        const numericMatrix = matrix.map((row) => row.map((val) => Number(val)));
        const numericRhs = rhs.map((val) => Number(val));

        if (
            numericMatrix.some((row) => row.some((val) => isNaN(val))) ||
            numericRhs.some((val) => isNaN(val))
        ) {
            alert("Hay valores no válidos en el sistema.");
            return;
        }

        if (!isDiagonallyDominant(numericMatrix)) {
            alert("La matriz no es diagonalmente dominante. El método de Gauss-Seidel puede no converger.");
        }

        const { solution, steps } = gaussSeidel(numericMatrix, numericRhs);
        setResult({ solution, steps });
    };

    return (
        <div className="px-4 py-6 bg-background min-h-screen">
            <h1 className="text-center text-2xl font-semibold mb-6">Práctica</h1>

            <Card className="w-full max-w-3xl mx-auto border border-border">
                <CardHeader>
                    <CardTitle>Editor de Sistema de Ecuaciones</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex gap-2 flex-wrap">
                        <Button onClick={addVariable}>Agregar incógnita</Button>
                        <Button variant="destructive" onClick={removeVariable}>
                            Quitar incógnita
                        </Button>
                    </div>

                    <table className="border-collapse mx-auto">
                        <tbody>
                            {matrix.map((row, i) => (
                                <tr key={i}>
                                    {row.map((value, j) => (
                                        <td key={j} className="p-1">
                                            <input
                                                type="text"
                                                value={value}
                                                onClick={(e: any) => e.target.select()}
                                                onChange={(e) => handleChange(i, j, e.target.value)}
                                                className="w-16 h-9 text-center bg-background border border-border rounded-md focus:border-ring focus:outline-none"
                                            />
                                        </td>
                                    ))}
                                    <td className="px-2 font-medium">=</td>
                                    <td className="p-1">
                                        <input
                                            type="text"
                                            value={rhs[i]}
                                            onClick={(e: any) => e.target.select()}
                                            onChange={(e) => handleChangeRhs(i, e.target.value)}
                                            className="w-16 h-9 text-center bg-background border border-border rounded-md focus:border-ring focus:outline-none"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Card className="bg-muted/50 border border-border">
                        <CardContent className="pt-4">
                            <div className="text-center">
                                <Latex>{`$$\\begin{cases} ${systemLatex} \\end{cases}$$`}</Latex>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            <div className="flex flex-col justify-center items-center gap-4 mt-6 mb-6">
                <Button onClick={handleSolve} className="w-48">
                    Resolver con Gauss-Seidel
                </Button>

                {result && (
                    <Card className="w-full max-w-3xl border border-border">
                        <CardHeader>
                            <CardTitle>Resultado</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold mb-2">Solución aproximada:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.solution.map((x, i) => (
                                        <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                                            <Latex>{`$x_{${i + 1}} = ${x.toFixed(4)}$`}</Latex>
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-semibold mb-2">Iteraciones:</h3>
                                <div className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                                    {result.steps.map((step, k) => (
                                        <div key={k} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md border border-border">
                                            <Badge variant="outline" className="font-mono text-xs shrink-0">
                                                {k + 1}
                                            </Badge>
                                            <div className="text-sm font-mono leading-none">
                                                {`[${step.map(v => v.toFixed(4)).join(", ")}]`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>

                    </Card>

                )}
            </div>
        </div>
    );
}   