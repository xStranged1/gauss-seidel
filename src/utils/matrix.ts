import { matrix, multiply, inv, add, subtract, abs } from "mathjs";

// Convierte array JS a matriz mathjs
export const toMatrix = (arr: number[][]) => matrix(arr);

// ✅ Multiplicación de matrices
export const multiplyMatrices = (A: number[][], B: number[][]) =>
    multiply(matrix(A), matrix(B)).toArray() as number[][];

// ✅ Inversa de matriz
export const inverseMatrix = (A: number[][]) => inv(matrix(A)).toArray() as number[][];

// ✅ Suma de matrices
export const addMatrices = (A: number[][], B: number[][]) =>
    add(matrix(A), matrix(B)).toArray() as number[][];

// ✅ Resta de matrices
export const subtractMatrices = (A: number[][], B: number[][]) =>
    subtract(matrix(A), matrix(B)).toArray() as number[][];

// ✅ Verificar si es diagonalmente dominante
export const isDiagonallyDominant = (A: number[][]): boolean => {
    for (let i = 0; i < A.length; i++) {
        const diag = abs(A[i][i]);
        const rowSum = A[i].reduce((sum, val, j) => sum + (j !== i ? abs(val) : 0), 0);
        if (diag <= rowSum) return false;
    }
    return true;
};

// ✅ Matriz triangular inferior (diagonal nula)
export const lowerTriangularZeroDiagonal = (A: number[][]): number[][] => {
    const n = A.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            L[i][j] = A[i][j];
        }
    }
    return L;
};

// ✅ Premultiplicar (M * A)
export const premultiply = (M: number[][], A: number[][]): number[][] =>
    multiply(matrix(M), matrix(A)).toArray() as number[][];

// ✅ Método de Gauss-Seidel
export const gaussSeidel = (
    A: number[][],
    b: number[],
    tol = 1e-6,
    maxIter = 100
): { solution: number[]; steps: number[][] } => {
    const n = A.length;
    let x = Array(n).fill(0);
    const steps: number[][] = [];

    for (let iter = 0; iter < maxIter; iter++) {
        const xNew = [...x];
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                if (j !== i) sum += A[i][j] * xNew[j];
            }
            xNew[i] = (b[i] - sum) / A[i][i];
        }
        steps.push([...xNew]);

        // Criterio de parada
        const error = Math.max(...xNew.map((xi, k) => Math.abs(xi - x[k])));
        if (error < tol) return { solution: xNew, steps };
        x = xNew;
    }
    return { solution: x, steps };
};
