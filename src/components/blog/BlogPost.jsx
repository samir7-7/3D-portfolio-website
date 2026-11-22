import { useState } from 'react'
import BlogLayout from './BlogLayout'
import MathFormula from './MathFormula'
import FigurePlaceholder from './FigurePlaceholder'
import { BLOGS } from '../../data/blogs'

export default function BlogPost({ onNavigate }) {
  const post = BLOGS[0] // SNB-00
  const [copied, setCopied] = useState(false)

  const handleBackToBlog = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('/blogs')
    } else {
      window.history.pushState({}, '', '/blogs')
      window.dispatchEvent(new Event('popstate'))
    }
  }

  const pseudocode = `START

INPUT circle1.centerX, circle1.centerY, circle1.radius
INPUT circle2.centerX, circle2.centerY, circle2.radius

distance = SQRT(
    (circle2.centerX - circle1.centerX)^2 +
    (circle2.centerY - circle1.centerY)^2
)

sumOfRadii = circle1.radius + circle2.radius

IF distance > sumOfRadii THEN
    PRINT "Circles are not overlapping"
ELSE IF distance < sumOfRadii THEN
    PRINT "Circles are overlapping"
ELSE
    PRINT "Circles are touching"
END IF

END`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pseudocode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <BlogLayout activeNav="blog" onNavigate={onNavigate}>
      <article className="blog-article">
        {/* Back Button matching the reference screenshot */}
        <div className="blog-back-wrapper">
          <a href="/blogs" onClick={handleBackToBlog} className="blog-back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back to blog</span>
          </a>
        </div>

        {/* Metadata Row matching the reference screenshot */}
        <div className="blog-meta">
          <time dateTime="2026-11-22">{post.date}</time>
          <span className="blog-meta-dot">•</span>
          <span>{post.readTime}</span>
          <span className="blog-meta-dot">•</span>
          <span>{post.author}</span>
        </div>

        {/* Main Article Title */}
        <h1 className="blog-title">{post.title}</h1>

        {/* Subtitle / Hook */}
        <p className="blog-subtitle">or: the day I used real math in programming</p>

        {/* Article Body */}
        <div className="blog-content">
          <p>
            About four years ago I got a programming problem that looked harmless. The user clicks somewhere on the screen, and you draw a circle there. The click is the center, and the radius is random. That's it.
          </p>

          <p>
            It was not &ldquo;it&rdquo;. Somewhere in the middle of that problem I needed to know whether one circle was touching another, and my brain just went blank. I had no loop or library to reach for. I needed to actually <em>think</em>, and I wasn't used to that yet.
          </p>

          <p>
            That problem changed how I look at programming, and I still carry some of it around today. So I'm going to walk you through it the way I wish someone had walked me through it.
          </p>

          <p>
            One promise before we start: I won't tie this to any programming language. I care more about you <em>feeling</em> why the answer works than about you memorizing a snippet. As it is the programming <strong>Darsan</strong> (दर्शन), a philosophy I work by. Understand first, type later.
          </p>

          <p>Ready? Good. Let's draw some circles.</p>

          <hr className="blog-divider" />

          <h2>First, we need a world to put them in</h2>

          <p>
            Before two circles can overlap, they need somewhere to live. That somewhere is the 2D plane, the flat grid you probably stared at in school while waiting for the bell.
          </p>

          <FigurePlaceholder
            src="/SNB-00/Figure-1.jpg"
            figureId="figure-1"
            name="Figure-1.jpg"
            caption="Figure 1: The 2D plane, with the X-axis, Y-axis and the origin labeled."
          />

          <p>Three things live here. Let's meet them one at a time.</p>

          <p>
            <strong>The Y-axis</strong> is the vertical line. If something moves up or down, it moved along Y.
          </p>

          <p>
            <strong>The X-axis</strong> is the horizontal line. If something moves left or right, it moved along X.
          </p>

          <p>
            <strong>The origin</strong> is the weird one, and the most important one, so stay with me.
          </p>

          <p>
            Imagine you're floating in a completely dark void. No floor, no walls, no stars. Nothing. Now someone tells you &ldquo;that object moved.&rdquo; Moved <em>compared to what</em>? You'd have no idea. Without something fixed to compare against, &ldquo;movement&rdquo; doesn't mean anything.
          </p>

          <p>
            The origin is that fixed thing. It's the spot written as <strong>(0, 0)</strong>, where the X-axis and Y-axis cross at a right angle. Every position on the plane is measured <em>from</em> it. It's the &ldquo;you are here&rdquo; sticker that never moves.
          </p>

          <hr className="blog-divider" />

          <h2>Pinning a point down</h2>

          <p>Now let's drop a point on the plane.</p>

          <FigurePlaceholder
            src="/SNB-00/Figure-2.jpg"
            figureId="figure-2"
            name="Figure-2.jpg"
            caption="Figure 2: Point G plotted at (3, 4), with dashed lines showing 3 units along X and 4 units along Y from the origin."
          />

          <p>
            Point <strong>G</strong> sits at <strong>(3, 4)</strong>. Read that as directions to a treasure: start at the origin, walk 3 steps along X, then 4 steps along Y. You've arrived at G.
          </p>

          <p>
            Notice how much work the origin is doing here. &ldquo;3 and 4&rdquo; means nothing on its own. It only means something <em>from the origin</em>.
          </p>

          <p>And of course one point is lonely, so let's add more.</p>

          <FigurePlaceholder
            src="/SNB-00/Figure-3.jpg"
            figureId="figure-3"
            name="Figure-3.jpg"
            caption="Figure 3: Multiple points plotted on the same 2D plane."
          />

          <hr className="blog-divider" />

          <h2>How far apart are two points?</h2>

          <p>
            Here's a question that sounds small and turns out to be the key to everything: how far is point G from point H?
          </p>

          <p>
            Let me say it plainly. You can't just look at the X difference or just the Y difference. G and H are usually off at a diagonal, so the straight line between them is neither purely sideways nor purely up.
          </p>

          <p>
            But look what happens when you draw the sideways gap and the upward gap together.
          </p>

          <FigurePlaceholder
            src="/SNB-00/Figure-4.png"
            figureId="figure-4"
            name="Figure-4.png"
            caption="Figure 4: Points G and H joined by a straight line. A horizontal and a vertical dashed line complete a right-angled triangle, and the straight line between G and H is its longest side."
          />

          <p>
            That's a right-angled triangle. The horizontal gap is one side, the vertical gap is the other, and the straight line from G to H is the long slanted side, the hypotenuse. And a right triangle is something we know how to deal with. Pythagoras figured this out a couple of thousand years ago, and the idea is old but it still works every single day.
          </p>

          <p>The distance formula is just that, written in a slightly scarier outfit:</p>

          <MathFormula formula={'\\boldsymbol{D = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}}'} />

          <p>
            You've almost certainly seen this before (and if you haven't, no worries, that's why you're here 😉). I used it all through school and never <em>felt</em> it. I just plugged numbers in and hoped. Now you know what it's really saying:
          </p>

          <ul className="blog-list">
            <li><code>x₂ − x₁</code> is how far apart the points are sideways.</li>
            <li><code>y₂ − y₁</code> is how far apart they are up and down.</li>
            <li>Square both, add them, take the square root, and you get the length of the slanted line.</li>
          </ul>

          <p>
            Let's try it. Say G is at <strong>(3, 4)</strong> and H is at <strong>(6, 8)</strong>.
          </p>

          <ul className="blog-list">
            <li>Sideways gap: 6 − 3 = <strong>3</strong></li>
            <li>Up-down gap: 8 − 4 = <strong>4</strong></li>
            <li>Distance: √(3² + 4²) = √(9 + 16) = √25 = <strong>5</strong></li>
          </ul>

          <p>
            Distance is 5. (Yes, I picked numbers that give a clean answer. The 3-4-5 triangle is the friend who always shows up when you need one.)
          </p>

          <hr className="blog-divider" />

          <h2>Now, the circles</h2>

          <p>
            Time to give these points some personality. Let's make G and H the <em>centers</em> of two circles, and call the circles <strong>A</strong> and <strong>B</strong>.
          </p>

          <FigurePlaceholder
            src="/SNB-00/Figure-5.png"
            figureId="figure-5"
            name="Figure-5.png"
            caption="Figure 5: Two circles plotted in 2D space. The center of each circle is a labeled point with coordinates."
          />

          <p>
            Since each center is a point with coordinates, we can already find the distance between the two centers. We just did that. It's 5.
          </p>

          <p>
            Okay. This next part is the whole blog, so <strong>I need your full attention</strong>. Put the phone down. Close the other fourteen tabs. I'll wait.
          </p>

          <hr className="blog-divider" />

          <h2>The aha moment</h2>

          <p>Look at two circles that are <em>not</em> touching.</p>

          <FigurePlaceholder
            src="/SNB-00/Figure-6.jpg"
            figureId="figure-6"
            name="Figure-6.jpg"
            caption="Figure 6: Two circles that are clearly apart. A blue line connects the two centers. Two orange lines show the radius of circle A and the radius of circle B, laid end to end along that line, with a visible gap left over."
          />

          <p>
            The blue line is the distance between the centers. The two orange lines are the radius of A and the radius of B.
          </p>

          <p>
            Now picture this. Start at the center of A and walk toward B. After you've walked A's radius, you've reached the edge of A. That's as far as circle A can stretch. Now imagine B doing the same thing from its side: it reaches out by <em>its</em> radius toward A.
          </p>

          <p>
            Two circles that stretch toward each other. If together they stretch far enough to meet, or cross, they overlap. If there's still empty space left between their edges, they don't.
          </p>

          <p>Put in numbers, and drawing the lengths to scale, it looks like this:</p>

          <blockquote className="blog-quote">
            <p>Say A has radius 2 and B has radius 2. Together they reach 2 + 2 = <strong>4</strong>.</p>
            <p>The centers are <strong>5</strong> apart.</p>
            <p>4 is less than 5, so there's a gap. <strong>No overlap.</strong></p>
          </blockquote>

          <p>
            So when circles are <em>not</em> overlapping, the sum of their radii is <strong>smaller</strong> than the distance between their centers.
          </p>

          <p>Now let's push them together.</p>

          <FigurePlaceholder
            src="/SNB-00/Figure-7.jpg"
            figureId="figure-7"
            name="Figure-7.jpg"
            caption="Figure 7: Two overlapping circles. The distance between centers is drawn in blue, and the two radii in orange, laid along it. This time the orange lines are longer than the blue one, so they overlap in the middle."
          />

          <blockquote className="blog-quote">
            <p>Same centers, still <strong>5</strong> apart, but now both circles have radius 3.</p>
            <p>Together they reach 3 + 3 = <strong>6</strong>.</p>
            <p>6 is bigger than 5, so they've gone past each other. <strong>Overlap.</strong></p>
          </blockquote>

          <p>
            And so when circles <em>are</em> overlapping, the sum of their radii is <strong>greater</strong> than the distance between their centers.
          </p>

          <p>That's it. That's the whole trick.</p>

          <hr className="blog-divider" />

          <h2>Putting it all together</h2>

          <p>To check whether two circles overlap:</p>

          <ol className="blog-ordered-list">
            <li>Find the distance between their centers (distance formula).</li>
            <li>Add up their two radii.</li>
            <li>If the distance is <strong>smaller</strong> than the radii sum, they overlap. If it's <strong>larger</strong>, they don't.</li>
          </ol>

          <p>
            Whenever you get stuck, picture two people reaching toward each other. Are their arms long enough to meet? That's all this is.
          </p>

          <p>
            One small edge case: what if the distance is <em>exactly</em> equal to the sum of the radii? Then the circles are just kissing, touching at a single point. Whether that counts as &ldquo;overlapping&rdquo; is up to you and your problem. Pick <code>&lt;</code> or <code>&lt;=</code> depending on what you want.
          </p>

          <hr className="blog-divider" />

          <h2>The code, if you want it</h2>

          <p>
            I said I wouldn't tie this to a language, so here's pseudocode. Translate it into whatever you like.
          </p>

          <div className="blog-code-container">
            <div className="code-header">
              <span className="code-lang">pseudocode</span>
              <button onClick={handleCopyCode} className="code-copy-btn" aria-label="Copy code">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="blog-code-block">
              <code>{pseudocode}</code>
            </pre>
          </div>

          <p>
            Four lines of real work, and every one of them is something we built together above.
          </p>

          <hr className="blog-divider" />

          <h2>About that 40 minutes</h2>

          <p>The problem came with a time limit of <strong>40 minutes</strong>.</p>

          <p>It took me more than <strong>2 hours</strong>.</p>

          <p>
            But when it finally worked, I can't even describe the feeling. It was a rush. I honestly believed I had cracked it, that I had reached the top of the mountain, and that the very next day my phone would ring with a call from Google.
          </p>

          <p>I'm still waiting for that call. 😄</p>

          <p>
            Still, I'll take that day over a hundred easy ones. It was the day I stopped treating math as something from school and started treating it as a tool, and it changed how I think about programming.
          </p>

          <p>
            So the next time you see a problem and want to jump straight to the code, pause for a second and try to <em>see</em> it first. Draw it. Imagine two people reaching their arms toward each other.
          </p>

          <p className="blog-closing-thought">
            The code is usually the easy part.
          </p>
        </div>
      </article>
    </BlogLayout>
  )
}
