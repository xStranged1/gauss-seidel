export const basename = "/gauss-seidel";


export const LATEX_GAUSS_SEIDEL = String.raw`\LARGE
x_i^{(k)} = \frac{1}{a_{ii}} \left[
b_i - \sum_{j=1}^{i-1} a_{ij} x_j^{(k)} - \sum_{j=i+1}^{n} a_{ij} x_j^{(k-1)}
\right] \qquad \forall i = 1:n \quad \forall k = 1:n
`;
export const LATEX_DIAGONALLY_DOMINANT = String.raw`\large
\left| a_{ii} \right| \geq \sum_{\substack{j=1 \\ j \neq i}}^{n} \left| a_{ij} \right|
`;
export const LATEX_GAUSS_SEIDEL_MATRICIAL = String.raw`\large
\textbf{Desarrollo matricial del método de Gauss-Seidel} \\[10pt]

\text{Sea el sistema: } A.\vec{x} = b \\[6pt]

\text{Se descompone la matriz } A \text{ en: } 
A = D - E - F \\[6pt]

\text{donde: } \\
D = 
\begin{bmatrix}
a_{11} & 0 & \cdots & 0 \\
0 & a_{22} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & a_{nn}
\end{bmatrix}, \quad
E =
\begin{bmatrix}
0 & 0 & \cdots & 0 \\
-a_{21} & 0 & \cdots & 0 \\
\vdots & \ddots & \ddots & \vdots \\
-a_{n1} & \cdots & -a_{n,n-1} & 0
\end{bmatrix}, \quad
F =
\begin{bmatrix}
0 & -a_{12} & \cdots & -a_{1n} \\
0 & 0 & \cdots & -a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 0
\end{bmatrix} \\[10pt]

\text{Reemplazando en } (2) \\[6pt]

(D - E) x = F x + b \\[6pt]

x^{(k+1)} = (D - E)^{-1} F x^{(k)} + (D - E)^{-1} b \\[10pt]

`;

export const LATEX_GS_DESARROLLO = String.raw`\Large
$$
\big[(D - E) - F \big]\vec{x} = \vec{b}
$$

$$
(D - E)\vec{x} - F\vec{x} = \vec{b}
$$

$$
(D - E)\vec{x} = F\vec{x} + \vec{b}
$$

\text{Premultiplicando por } (D - E)^{-1}:
$$
\underbrace{(D - E)^{-1}(D - E)}_{I}\vec{x} 
= (D - E)^{-1}F\vec{x} + (D - E)^{-1}\vec{b}
\qquad (4)
$$

\text{Despejando } F \text{ de (2):}
$$
F = (D - E) - A \qquad (5)
$$

\text{Reemplazando (5) en (4):}
$$
\vec{x} = (D - E)^{-1}\Big[(D - E) - A\Big]\vec{x} + (D - E)^{-1}\vec{b}
$$

$$
\text{Definiendo } T_s = (D - E)^{-1} F, \quad c = (D - E)^{-1} b \\[6pt]

\text{El esquema iterativo es:} \\
x^{(k+1)} = T_s x^{(k)} + c
$$
`;

export const MATRIX_4x4: string[][] = [
    ["-25", "2", "3", "4"],
    ["4", "-15", "7", "-3"],
    ["9", "10", "-34", "12"],
    ["13", "14", "15", "-54"]
];

export const MATRIX_4x1: string[] = [
    "-100",
    "200",
    "-27",
    "34"
]