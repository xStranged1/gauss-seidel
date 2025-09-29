import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Latex from "react-latex-next";
import { gaussSeidel, isDiagonallyDominant, parseFraction } from "@/utils/matrix";
import { MATRIX_4x1, MATRIX_4x4 } from "@/const/const";

export default function PracticaScreen() {

    const initalMatrix = MATRIX_4x4
    const INITIAL_SOLUTION = MATRIX_4x4.map(() => "0");
    const [matrix, setMatrix] = useState<string[][]>(initalMatrix);
    const [initialSolution, setInitialSolution] = useState<string[]>(INITIAL_SOLUTION);

    const [rhs, setRhs] = useState<string[]>(MATRIX_4x1);
    const [result, setResult] = useState<{ solution: number[], steps: number[][] } | null>(null);
    const [errorType, setErrorType] = useState<"absolute" | "relative">("absolute");
    const [tolerance, setTolerance] = useState<string>("1e-6");

    const addVariable = () => {
        setMatrix((prev) => {
            const size = prev.length + 1;
            const newMatrix = prev.map((row) => [...row, "0"]);
            newMatrix.push(Array(size).fill("0"));
            return newMatrix;
        });
        setRhs((prev) => [...prev, "0"]);
        setInitialSolution((prev) => [...prev, "0"]);
    };

    const removeVariable = () => {
        if (matrix.length > 1) {
            setMatrix((prev) => prev.slice(0, -1).map((row) => row.slice(0, -1)));
            setRhs((prev) => prev.slice(0, -1));
            setInitialSolution((prev) => prev.slice(0, -1));
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

    const handleChangeInitialSolution = (i: number, value: string) => {
        const newMatrix = initialSolution.map((v, ri) => (ri === i ? value : v));
        setInitialSolution(newMatrix);
    };

    const initialSolutionLatex = initialSolution
        .map((val, i) => `x_{${i + 1}}^{(0)} = ${val}`)
        .join(String.raw`,     \; `);

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
        const numericMatrix = matrix.map((row) => row.map((val) => parseFraction(val)));
        const numericRhs = rhs.map((val) => parseFraction(val));
        const tol = parseFraction(tolerance);
        const initialSol = initialSolution.map(v => parseFraction(v))
        if (
            numericMatrix.some((row) => row.some((val) => isNaN(val))) ||
            numericRhs.some((val) => isNaN(val)) ||
            isNaN(tol) || tol <= 0
        ) {
            alert("Hay valores no válidos en el sistema o tolerancia.");
            return;
        }

        if (!isDiagonallyDominant(numericMatrix)) {
            alert("La matriz no es diagonalmente dominante. El método de Gauss-Seidel puede no converger.");
        }

        if (initialSol.some(v => isNaN(v))) {
            alert("El vector inicial tiene valores no válidos.");
            return;
        }

        const { solution, steps } = gaussSeidel(numericMatrix, numericRhs, tol, errorType, 100, initialSol);
        setResult({ solution, steps });
    };

    return (
        <div className="px-4 py-6 bg-background min-h-screen">

            <Card className="w-full max-w-3xl mx-auto border border-border">
                <CardHeader>
                    <CardTitle className="text-2xl">Configuración del método</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <h2 className="text-lg font-medium">Sistema de ecuaciones</h2>
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

                    <Separator />

                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-semibold mb-2">Vector inicial</Label>
                            <tr>
                                {initialSolution.map((value, i) => (
                                    <td key={i} className="p-1">
                                        <input
                                            type="text"
                                            value={value}
                                            onClick={(e: any) => e.target.select()}
                                            onChange={(e) => handleChangeInitialSolution(i, e.target.value)}
                                            className="w-16 h-9 text-center bg-background border border-border rounded-md focus:border-ring focus:outline-none"
                                        />
                                    </td>
                                ))}
                            </tr>
                            <Card className="bg-muted/50 border border-border">
                                <CardContent className="pt-2">
                                    <div className="text-center">
                                        <Latex>{`$$ ${initialSolutionLatex} $$`}</Latex>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Label className="text-sm font-semibold mb-2">Criterio de parada</Label>
                            <RadioGroup
                                value={errorType}
                                onValueChange={(v) => setErrorType(v as "absolute" | "relative")}
                                className="flex gap-4 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                <RadioGroupItem value="absolute" id="absolute" />
                                <Label htmlFor="absolute" className="font-normal cursor-pointer">
                                    Error Absoluto
                                </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                <RadioGroupItem value="relative" id="relative" />
                                <Label htmlFor="relative" className="font-normal cursor-pointer">
                                    Error Relativo
                                </Label>
                                </div>
                            </RadioGroup>

                            {/* Mostrar fórmula según selección */}
                            <Card className="bg-muted/50 border border-border mt-4">
                                <CardContent className="pt-4">
                                <div className="text-center">
                                    {errorType === "absolute" && (
                                    <Latex>{`$$\\left| x_i^{(k)} - x_i^{(k-1)} \\right| < \\varepsilon, \\quad \\forall x_i = 1:n$$`}</Latex>
                                    )}
                                    {errorType === "relative" && (
                                    <Latex>{`$$\\frac{\\left| x_i^{(k)} - x_i^{(k-1)} \\right|}{\\left| x_i^{(k)} \\right|} < \\varepsilon, \\quad \\forall x_i = 1:n$$`}</Latex>
                                    )}
                                </div>
                                </CardContent>
                            </Card>
                            </div>

                        <div>
                            <Label htmlFor="tolerance" className="text-sm font-semibold">Tolerancia</Label>
                            <Input
                                id="tolerance"
                                type="text"
                                value={tolerance}
                                onChange={(e) => setTolerance(e.target.value)}
                                className="w-32 mt-2"
                                placeholder="1e-6"
                            />
                        </div>
                    </div>
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