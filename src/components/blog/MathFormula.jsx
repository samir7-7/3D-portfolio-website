import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function MathFormula({ formula }) {
  let expr = formula || '\\boldsymbol{D = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}}'
  
  // Normalize if unescaped sqrt was passed from JSX
  if (!expr.includes('\\sqrt') && expr.includes('sqrt')) {
    expr = expr.replace(/sqrt/g, '\\sqrt')
  }

  // Wrap in boldsymbol to match the bold LaTeX mathematical typesetting from reference image
  if (!expr.includes('\\boldsymbol')) {
    expr = `\\boldsymbol{${expr}}`
  }

  const html = katex.renderToString(expr, {
    displayMode: true,
    throwOnError: false,
  })

  return (
    <div className="blog-math-container display-math">
      <div
        className="katex-rendered-wrapper"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
