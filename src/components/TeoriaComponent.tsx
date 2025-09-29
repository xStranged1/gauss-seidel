import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Latex from "react-latex-next";

export default function GaussSeidelTheory() {
  return (
    <div className="px-4 py-6 bg-background min-h-screen">
      {/* Introducción */}
      <Card className="w-full max-w-3xl mx-auto border border-border">
        <CardHeader>
          <CardTitle className="text-2xl">Método de Gauss - Seidel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed">
          <p>
            El método de Gauss-Seidel es muy semejante al método de Jacobi. En
            Jacobi se usan los valores de la iteración anterior, mientras que en
            Gauss-Seidel se combinan valores recién calculados en la misma
            iteración con valores anteriores.
          </p>
          <p>
            Si el sistema es{" "}
            <span className="italic font-semibold">diagonalmente dominante</span>,
            se garantiza la convergencia y el método es más rápido que Jacobi.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Sistema 3x3 */}
      <Card className="w-full max-w-3xl mx-auto border border-border">
        <CardHeader>
          <CardTitle className="text-lg">Ejemplo: Sistema 3x3</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Latex>{`$$
          \\begin{cases}
          a_{11}x_1 + a_{12}x_2 + a_{13}x_3 = b_1 \\\\
          a_{21}x_1 + a_{22}x_2 + a_{23}x_3 = b_2 \\\\
          a_{31}x_1 + a_{32}x_2 + a_{33}x_3 = b_3
          \\end{cases}
          $$`}</Latex>
          <p className="mt-2 text-xs text-muted-foreground">
            Suponemos que \(a_{11}, a_{22}, a_{33} \neq 0\).
          </p>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Despejes */}
      <Card className="w-full max-w-3xl mx-auto border border-border">
        <CardHeader>
          <CardTitle className="text-lg">Despejes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Latex>{`$$x_1 = \\frac{1}{a_{11}} \\Big( b_1 - (a_{12}x_2 + a_{13}x_3) \\Big)$$`}</Latex>
          <Latex>{`$$x_2 = \\frac{1}{a_{22}} \\Big( b_2 - (a_{21}x_1 + a_{23}x_3) \\Big)$$`}</Latex>
          <Latex>{`$$x_3 = \\frac{1}{a_{33}} \\Big( b_3 - (a_{31}x_1 + a_{32}x_2) \\Big)$$`}</Latex>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Iteraciones */}
      <Card className="w-full max-w-3xl mx-auto border border-border">
        <CardHeader>
          <CardTitle className="text-lg">Esquema Iterativo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Latex>{`$$x_1^{(k)} = \\frac{1}{a_{11}} \\Big( b_1 - (a_{12}x_2^{(k-1)} + a_{13}x_3^{(k-1)}) \\Big)$$`}</Latex>
          <Latex>{`$$x_2^{(k)} = \\frac{1}{a_{22}} \\Big( b_2 - (a_{21}x_1^{(k)} + a_{23}x_3^{(k-1)}) \\Big)$$`}</Latex>
          <Latex>{`$$x_3^{(k)} = \\frac{1}{a_{33}} \\Big( b_3 - (a_{31}x_1^{(k)} + a_{32}x_2^{(k)}) \\Big)$$`}</Latex>
        </CardContent>
      </Card>

      <Separator className="my-6" />

    </div>
  );
}
